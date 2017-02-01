'use strict';

var yaml = require('js-yaml')


function NeedValue() {}
exports.NeedValue = NeedValue

// 参考： https://github.com/nodeca/js-yaml/blob/master/examples/custom_types.js
var NeedValueYamlType = new yaml.Type('!need', {
    kind: 'mapping',
    construct: function(data) {
        data = data || {}       // in case of empty node
        return new NeedValue()
    },
    instanceOf: NeedValue
})

exports.DEFAULTS_SCHEMA = yaml.Schema.create([ NeedValueYamlType ])
