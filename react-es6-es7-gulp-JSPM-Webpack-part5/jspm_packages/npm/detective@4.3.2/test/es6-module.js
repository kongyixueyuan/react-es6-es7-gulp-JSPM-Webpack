/* */ 
var test = require('tap').test;
var detective = require('../../detective@4.3.2');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/es6-module.js');
test('es6-module', function(t) {
  t.plan(1);
  t.deepEqual(detective(src, {parse: {sourceType: 'module'}}), ['a', 'b']);
});
