/* global describe, it */
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var Dauria = require('../');

describe('base64 encoder', function(){
   it('encodes a red dot', function(){
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
});