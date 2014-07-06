/* global describe, it */
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var Dauria = require('../');

describe('base64 encoder', function(){
   it('encodes a red dot (Wikipedia example)', function(){
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
   it('encodes Larry (RFC2397 example)', function(){
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