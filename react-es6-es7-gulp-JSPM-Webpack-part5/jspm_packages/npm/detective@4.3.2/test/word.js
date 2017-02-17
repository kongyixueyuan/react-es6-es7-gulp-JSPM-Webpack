/* */ 
var test = require('tap').test;
var detective = require('../../detective@4.3.2');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/word.js');
test('word', function(t) {
  t.deepEqual(detective(src, {word: 'load'}), ['a', 'b', 'c', 'events', 'doom', 'y', 'events2']);
  t.end();
});
