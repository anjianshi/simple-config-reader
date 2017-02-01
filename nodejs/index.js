'use strict';

var yaml = require('js-yaml')
var utils = require('./utils')
var schemas = require('./schemas')
var _ = require('lodash')


// customValuesPath 是可选的
function readConfig(defaultsPath, customValuesPath) {
    var defaults = utils.loadYAML(defaultsPath, schemas.DEFAULTS_SCHEMA) || {}
    var customValues = customValuesPath
        ? (utils.loadYAML(customValuesPath) || {})
        : {}

    var unknownPaths = []
    utils.walkObject(customValues, function checkUnknownPath(path) {
        if(!_.has(defaults, path)) unknownPaths.push(path.join('.'))
    })
    if(unknownPaths.length) {
        throw Error('customValues 中出现了 defaults 里未定义的配置项：' + unknownPaths.join(', '))
    }

    var config = {}
    var missedPaths = []
    utils.walkObject(defaults, function mergeConfig(path, defaultValue) {
        var value = _.get(customValues, path, defaultValue)
        if(value instanceof schemas.NeedValue) {
            missedPaths.push(path.join('.'))
        } else {
            _.set(config, path, value)
        }
    })

    if(missedPaths.length) {
        throw Error('以下配置项未赋值：' + missedPaths.join(', '))
    }

    return config
}


/*
groups:
[
    (defaultsPathA, customValuesPathA),
    defaultsPathB,
    ...
]
*/
function batchReadConfig(groups) {
    var mergedConfig = {}

    for(var i = 0; i < groups.length; i++) {
        var defaultsPath, customValuesPath = null

        var group = groups[i]
        if(typeof group === 'string') {
            defaultsPath = group
        } else {
            defaultsPath = group[0]
            customValuesPath = group[1]
        }
        var currConfig = readConfig(defaultsPath, customValuesPath)

        var duplicateKeys = _.intersection(
            _.keys(mergedConfig), _.keys(currConfig)
        )
        if(duplicateKeys.length) {
            throw Error('配置项重复出现：' + duplicateKeys.join(', '))
        }

        _.assign(mergedConfig, currConfig)
    }
    return mergedConfig
}


exports.readConfig = readConfig
exports.batchReadConfig = batchReadConfig
