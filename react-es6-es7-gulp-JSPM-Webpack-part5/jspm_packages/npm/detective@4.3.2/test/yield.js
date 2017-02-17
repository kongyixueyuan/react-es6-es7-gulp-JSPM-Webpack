/* */ 
var test = require('tap').test;
var detective = require('../../detective@4.3.2');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/yield.js');
test('yield', function(t) {
  t.plan(1);
  t.deepEqual(detective(src), ['a', 'c']);
});
