"use strict";

exports.__esModule = true;

function getFileNameByState(state) {
  var file = state.file || {};
  var opts = file.opts || {};
  
  return (opts.sourceFileName || '').replace("src\\", "").replace(".vue", "");
}

exports.default = function (babel) {
  var t = babel.types;  
  console.log('babel-plugin-transform-magic-variable init');
  return {
    visitor: {
      Identifier: function (path, state) {
        var name = path.node.name;
        if( name == '__FILE__' ){
          var file_name = getFileNameByState(state);
          if(t.isMemberExpression(path.parent)){
            return path.parentPath.replaceWith(
              t.stringLiteral(file_name)
            );
          } else {
            return path.replaceWith(
              t.stringLiteral(file_name)
            );
          }
        }
      }
    }
  };
};

module.exports = exports["default"];