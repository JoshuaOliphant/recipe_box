#!/bin/bash

./bin/bump-version.js "$@"

VERSION=$(node --eval "console.log(require('./package.json').version);")

git add bower.json package.json

git commit -m "v$VERSION"
