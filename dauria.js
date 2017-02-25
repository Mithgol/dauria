var iconv = require('iconv-lite');

var Dauria = function(){
   if (!(this instanceof Dauria)) return new Dauria();
};

var urldecodeBuffer = function(urlencoded){
   var arrBuffers = urlencoded.split(
      /(%[0-9A-Fa-f]{2})/
   ).map(function(fragment, idx){      
      if( idx % 2 === 0 ){ // simple string fragment's index: 0, 2, 4...
         return new Buffer(fragment, 'binary');
      } else { // regex-captured fragment's index: 1, 3, 5...
         return new Buffer(fragment.replace(/%/g, ''), 'hex');
      }
   });
   return Buffer.concat(arrBuffers);
};

Dauria.prototype.getBase64DataURI = function(sourceBuffer, MIME){
   if( typeof MIME === 'undefined' ) MIME = 'application/octet-stream';

   return 'data:' + MIME + ';base64,' + sourceBuffer.toString('base64');
};

Dauria.prototype.parseDataURI = function(dataURI){
   if( dataURI.indexOf('data:') !== 0 ){
      throw new Error(this.errors.MISSING_PREFIX);
   }
   var commaSplit = dataURI.slice('data:'.length).split(',');
   if( commaSplit.length < 2 ) throw new Error(this.errors.MISSING_COMMA);

   var beforeData = commaSplit.shift();
   var encodedData = commaSplit.join(',');

   var semicolonSplit = beforeData.split(/;\s*/);
   var base64 = false;
   if(
      semicolonSplit.length >= 2 &&
      semicolonSplit[semicolonSplit.length - 1] === 'base64'
   ){
      base64 = true;
      semicolonSplit.pop();
   }
   var decodedBuffer;
   if( base64 ){
      decodedBuffer = new Buffer(encodedData, 'base64');
   } else { // not base64, i.e. urlencoded
      decodedBuffer = urldecodeBuffer(encodedData);
   }
   if( semicolonSplit.length === 1 && semicolonSplit[0] === '' ){
      semicolonSplit = [ 'text/plain', 'charset=US-ASCII' ];
   }
   var MIME = semicolonSplit[0];
   var mediaType = semicolonSplit.join(';');
   if( MIME.toLowerCase().indexOf('text/') !== 0 ){ // not a text
      return {
         'MIME': MIME,
         'mediaType': mediaType,
         'buffer': decodedBuffer,
         'text': null,
         'charset': null
      };
   }
   // we have a text; determine its encoding:
   semicolonSplit.shift();
   semicolonSplit = semicolonSplit.map(function(urlparam){
      if( urlparam.toLowerCase().indexOf('charset=') !== 0 ){
         return null; // not a charset parameter, drop it
      }
      var charset = urlparam.slice('charset='.length);
      return charset;
   }).filter(function(charset){
      return charset !== null;
   });
   if( semicolonSplit.length === 0 ) semicolonSplit = ['US-ASCII'];
   var decodedText;
   if( iconv.encodingExists(semicolonSplit[0]) ){
      decodedText = iconv.decode(decodedBuffer, semicolonSplit[0]);
   } else {
      decodedText = null;
   }
   return {
      'MIME': MIME,
      'mediaType': mediaType,
      'buffer': decodedBuffer,
      'charset': semicolonSplit[0],
      'text': decodedText
   };
};

Dauria.prototype.errors = {
   MISSING_PREFIX: 'Cannot find "data:" in the beginning of the URL!',
   MISSING_COMMA: 'Cannot find a comma in the given URL!'
};

module.exports = new Dauria();