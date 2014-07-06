var Dauria = function(){
   if (!(this instanceof Dauria)) return new Dauria();
};

Dauria.prototype.getBase64DataURI = function(sourceBuffer, MIME){
   if( typeof MIME === 'undefined' ) MIME = 'application/octet-stream';

   return 'data:' + MIME + ';base64,' + sourceBuffer.toString('base64');
};

module.exports = new Dauria();