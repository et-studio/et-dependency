
exports.ng = function ng (contents, moduleId) {
  return `;angular.module('et.template', []).factory('${moduleId}', [function() {
    var exports = {};
    var module = {};

    ${contents}

    return module.exports || exports;
  }]);`
}

exports.cmd = function cmd (contents) {
  return `;define(function (require, module, exports) {
    ${contents}
  });`
}

exports.amd = function amd (contents, moduleId) {
  return `;define('${moduleId}', [], function() {
    var exports = {};
    var module = {};

    ${contents}

    return module.exports || exports;
  });`
}

exports.global = function global (contents, moduleId) {
  return `;(function(global){
    var exports = {};
    var module = {};

    ${contents}

    global['${moduleId}'] = module.exports || exports;
  })(window || this);`
}
