/* */ 
'use strict';
require('mock-modules').autoMockOff();
var transformFn = require('../../../jstransform@11.0.3').transform;
var visitors = require('../react-display-name-visitors').visitorList;
function transform(code) {
  return transformFn(visitors, code);
}
describe('react displayName jsx', function() {
  it('should only inject displayName if missing', function() {
    var code = ['"use strict";', 'var Whateva = React.createClass({', '  displayName: "Whateva",', '  render: function() {', '    return null;', '  }', '});'].join('\n');
    var result = ['"use strict";', 'var Whateva = React.createClass({', '  displayName: "Whateva",', '  render: function() {', '    return null;', '  }', '});'].join('\n');
    expect(transform(code).code).toEqual(result);
  });
  it('should inject displayName in simple assignment', () => {
    var code = ['var Component = React.createClass({', '  render: function() {', '    return null;', '  }', '});'].join('\n');
    var result = ['var Component = React.createClass({displayName: "Component",', '  render: function() {', '    return null;', '  }', '});'].join('\n');
    expect(transform(code).code).toEqual(result);
  });
  it('should inject displayName in simple assignment without var', () => {
    var code = ['var Component;', 'Component = React.createClass({', '  render: function() {', '    return null;', '  }', '});'].join('\n');
    var result = ['var Component;', 'Component = React.createClass({displayName: "Component",', '  render: function() {', '    return null;', '  }', '});'].join('\n');
    expect(transform(code).code).toEqual(result);
  });
  it('should inject displayName in property assignment', () => {
    var code = ['ns.Component = React.createClass({', '  render: function() {', '    return null;', '  }', '});'].join('\n');
    var result = ['ns.Component = React.createClass({displayName: "ns.Component",', '  render: function() {', '    return null;', '  }', '});'].join('\n');
    expect(transform(code).code).toEqual(result);
  });
  it('should inject displayName in chained property assignment', () => {
    var code = ['ns.ns1.Component = React.createClass({', '  render: function() {', '    return null;', '  }', '});'].join('\n');
    var result = ['ns.ns1.Component = React.createClass({displayName: "ns.ns1.Component",', '  render: function() {', '    return null;', '  }', '});'].join('\n');
    expect(transform(code).code).toEqual(result);
  });
  it('should inject displayName in exports property assignment', () => {
    var code = ['exports.Component = React.createClass({', '  render: function() {', '    return null;', '  }', '});'].join('\n');
    var result = ['exports.Component = React.createClass({displayName: "Component",', '  render: function() {', '    return null;', '  }', '});'].join('\n');
    expect(transform(code).code).toEqual(result);
  });
  it('should inject displayName in object declaration', () => {
    var code = ['exports = {', '  Component: React.createClass({', '    render: function() {', '      return null;', '    }', '  })', '};'].join('\n');
    var result = ['exports = {', '  Component: React.createClass({displayName: "Component",', '    render: function() {', '      return null;', '    }', '  })', '};'].join('\n');
    expect(transform(code).code).toEqual(result);
  });
});
