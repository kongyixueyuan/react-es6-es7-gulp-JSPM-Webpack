/* */ 
var test = require('tap').test;
var detective = require('../../detective@4.3.2');
var fs = require('fs');
var src = ['require("a")\nreturn'];
test('return', function(t) {
  t.plan(1);
  t.deepEqual(detective(src), ['a']);
});
