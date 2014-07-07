/* global describe, it */
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var Dauria = require('../');

describe('base64 encoder', function(){
   it('encodes a red dot (an example from Wikipedia)', function(){
      assert.strictEqual(
         Dauria.getBase64DataURI(
            fs.readFileSync( path.join(__dirname, 'red-dot-5px.png') ),
            'image/png'
         ),
         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyb' +
         'lAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5E' +
         'rkJggg=='
      );
   });
   it('encodes Larry (an example from RFC2397)', function(){
      assert.strictEqual(
         Dauria.getBase64DataURI(
            fs.readFileSync( path.join(__dirname, 'larry.gif') ),
            'image/gif'
         ),
         'data:image/gif;base64,R0lGODdhMAAwAPAAAAAAAP///ywAAAAAMAAwAAAC8Iy' +
         'Pqcvt3wCcDkiLc7C0qwyGHhSWpjQu5yqmCYsapyuvUUlvONmOZtfzgFzByTB10Qgx' +
         'OR0TqBQejhRNzOfkVJ+5YiUqrXF5Y5lKh/DeuNcP5yLWGsEbtLiOSpa/TPg7JpJHx' +
         'yendzWTBfX0cxOnKPjgBzi4diinWGdkF8kjdfnycQZXZeYGejmJlZeGl9i2icVqaN' +
         'VailT6F5iJ90m6mvuTS4OK05M0vDk0Q4XUtwvKOzrcd3iq9uisF81M1OIcR7lEeww' +
         'cLp7tuNNkM3uNna3F2JQFo97Vriy/Xl4/f1cf5VWzXyym7PHhhx4dbgYKAAA7'
      );
   });
});

describe('data URI decoder', function(){
   it('decodes a red dot (an example from Wikipedia)', function(){
      assert.deepEqual(
         Dauria.parseDataURI(
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACN' +
            'byblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAA' +
            'BJRU5ErkJggg=='
         ),
         {
            'MIME': 'image/png',
            'mediaType': 'image/png',
            'buffer': fs.readFileSync(
               path.join(__dirname, 'red-dot-5px.png')
            ),
            'text': null,
            'charset': null
         }
      );
   });
   it('decodes HTML (an example from Wikipedia)', function(){
      assert.deepEqual(
         Dauria.parseDataURI(
            'data:text/html;charset=utf-8,' + 
             encodeURIComponent(
                '<!DOCTYPE html>'+
                '<html lang="en">'+
                '<head><title>Embedded Window</title></head>'+
                '<body><h1>42</h1></body>'+
                '</html>'
             )
         ),
         {
            'MIME': 'text/html',
            'mediaType': 'text/html;charset=utf-8',
            'buffer': Buffer(
               '<!DOCTYPE html><html lang="en">' +
               '<head><title>Embedded Window</title></head>' +
               '<body><h1>42</h1></body></html>',
               'utf8'
            ),
            'text': '<!DOCTYPE html><html lang="en">' +
               '<head><title>Embedded Window</title></head>' +
               '<body><h1>42</h1></body></html>',
            'charset': 'utf-8'
         }
      );
   });
   it('decodes Larry (an example from RFC2397)', function(){
      assert.deepEqual(
         Dauria.parseDataURI(
            'data:image/gif;base64,R0lGODdhMAAwAPAAAAAAAP///ywAAAAAMAAwAAAC' +
            '8IyPqcvt3wCcDkiLc7C0qwyGHhSWpjQu5yqmCYsapyuvUUlvONmOZtfzgFzByT' +
            'B10QgxOR0TqBQejhRNzOfkVJ+5YiUqrXF5Y5lKh/DeuNcP5yLWGsEbtLiOSpa/' +
            'TPg7JpJHxyendzWTBfX0cxOnKPjgBzi4diinWGdkF8kjdfnycQZXZeYGejmJlZ' +
            'eGl9i2icVqaNVailT6F5iJ90m6mvuTS4OK05M0vDk0Q4XUtwvKOzrcd3iq9uis' +
            'F81M1OIcR7lEewwcLp7tuNNkM3uNna3F2JQFo97Vriy/Xl4/f1cf5VWzXyym7P' +
            'Hhhx4dbgYKAAA7'
         ),
         {
            'MIME': 'image/gif',
            'mediaType': 'image/gif',
            'buffer': fs.readFileSync(
               path.join(__dirname, 'larry.gif')
            ),
            'text': null,
            'charset': null
         }
      );
   });
   it('decodes "A brief note" (an example from RFC2397)', function(){
      assert.deepEqual(
         Dauria.parseDataURI('data:,A%20brief%20note'),
         {
            'MIME': 'text/plain',
            'mediaType': 'text/plain;charset=US-ASCII',
            'buffer': Buffer('A brief note'),
            'text': 'A brief note',
            'charset': 'US-ASCII'
         }
      );
   });
   it('decodes "слово" (a modified example from RFC2397)', function(){
      assert.deepEqual(
         Dauria.parseDataURI('data:text/plain;charset=cp866,%e1%AB%ae%A2%ae'),
         {
            'MIME': 'text/plain',
            'mediaType': 'text/plain;charset=cp866',
            'buffer': Buffer('e1ABaeA2ae', 'hex'),
            'text': 'слово',
            'charset': 'cp866'
         }
      );
   });
   it('decodes application/vnd-xxx-query (an example from RFC2397)',
   function(){
      assert.deepEqual(
         Dauria.parseDataURI(
            'data:application/vnd-xxx-query,select_vcount,' +
            'fcol_from_fieldtable/local'
         ),
         {
            'MIME': 'application/vnd-xxx-query',
            'mediaType': 'application/vnd-xxx-query',
            'buffer': Buffer('select_vcount,fcol_from_fieldtable/local'),
            'text': null,
            'charset': null
         }
      );
   });
});