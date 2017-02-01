'use strict';

var yaml = require('js-yaml')
var fs = require('fs')
var _ = require('lodash')


exports.loadYAML = function loadYAML(path, schema) {
    var src = fs.readFileSync(path)
    return yaml.safeLoad(src, {
        schema: schema || yaml.DEFAULT_SAFE_SCHEMA
    })
}


// callback(['node', 'path', 'list'], nodeValue)
exports.walkObject = function walkObject(obj, callback, _parentPath) {
    if(!_parentPath) _parentPath = []
    for(var key in obj) {
        var path = _.concat(_parentPath, key)
        var value = obj[key]
        if(_.isPlainObject(value)) {
            walkObject(value, callback, path)
        } else {
            callback(path, value)
        }
    }
}
