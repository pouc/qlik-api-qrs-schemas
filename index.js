'use strict';

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var promise = require('q');
var semver = require('semver');

var readdir = promise.denodeify(glob);
var readFile = promise.denodeify(fs.readFile);

/**
 *
 * [![GitHub version](https://badge.fury.io/gh/pouc%2Fqlik-api-qrs-schemas.svg)](https://badge.fury.io/gh/pouc%2Fqlik-api-qrs-schemas)
 * [![npm version](https://badge.fury.io/js/qlik-api-qrs-schemas.svg)](https://badge.fury.io/js/qlik-api-qrs-schemas)
 * [![NPM monthly downloads](https://img.shields.io/npm/dm/qlik-api-qrs-schemas.svg?style=flat)](https://npmjs.org/package/qlik-api-qrs-schemas)
 * [![Build Status](https://travis-ci.org/pouc/qlik-api-qrs-schemas.svg?branch=master)](https://travis-ci.org/pouc/qlik-api-qrs-schemas)
 * [![Dependency Status](https://gemnasium.com/badges/github.com/pouc/qlik-api-qrs-schemas.svg)](https://gemnasium.com/github.com/pouc/qlik-api-qrs-schemas)
 * [![Coverage Status](https://coveralls.io/repos/github/pouc/qlik-api-qrs-schemas/badge.svg?branch=master)](https://coveralls.io/github/pouc/qlik-api-qrs-schemas?branch=master)
 * [![Known Vulnerabilities](https://snyk.io/test/github/pouc/qlik-api-qrs-schemas/badge.svg)](https://snyk.io/test/github/pouc/qlik-api-qrs-schemas)
 *
 * a list of schemas of the Qlik Sense QRS API
 *
 * 10.0.4.0 ⇒ 3.1.0.0
 *
 * @module qlik-api-qrs-schemas
 * @typicalname schemas
 * @author Lo&iuml;c Formont
 *
 * @license MIT Licensed
 *
 * @example
 * ```javascript
 * var schema = require('qlik-api-qrs-schemas')('10.0.4.0');
 * ```
 */
module.exports = function(version) {

    if (version === 'latest') {

        return readdir('./schemas/**/*.json').then((files) => {

            return module.exports(
                files
                    .map(file => path.basename(file, '.json'))
                    .filter(version => semver.valid(version) !== null)
                    .sort(semver.rcompare)[0]
            );

        });

    } else {

        return readFile(`./schemas/${version}.json`).then((schema) => {
            return JSON.parse(schema);
        });

    }

};
