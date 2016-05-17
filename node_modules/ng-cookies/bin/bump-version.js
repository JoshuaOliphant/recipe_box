#!/usr/bin/env node

'use strict';

var fs = require('fs');
var semver = require('semver');

var npmData = require(__dirname + '/../package.json');
var currentVersion = npmData.version;
var versionArg = process.argv[process.argv.length - 1];
var newVersion = semver.valid(versionArg);
if (!newVersion) {
  newVersion = semver.inc(currentVersion, versionArg);
}
if (!newVersion) {
  console.error('Version not changed');
  process.exit(1);
}

npmData.version = newVersion;
fs.writeFileSync('package.json', JSON.stringify(npmData, null, 2) + '\n'), {
  encoding: 'utf8'
};

var bowerData = require(__dirname + '/../bower.json');
bowerData.version = newVersion;
fs.writeFileSync('bower.json', JSON.stringify(bowerData, null, 2) + '\n', {
  encoding: 'utf8'
});

console.log('Version ' + newVersion);
