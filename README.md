This Node.js module for <b>Da</b>ta <b>URI a</b>pplications is called **Dauria** (after a part of [Transbaikal](http://en.wikipedia.org/wiki/Transbaikal)).

It performs conversions between Node.js Buffers and [RFC2397-compliant](http://tools.ietf.org/html/rfc2397) Data URIs.

## Installing Dauria

[![(npm package version)](https://nodei.co/npm/dauria.png?downloads=true)](https://npmjs.org/package/dauria) [![(a histogram of downloads)](https://nodei.co/npm-dl/dauria.png?months=3)](https://npmjs.org/package/dauria)

* Latest packaged version: `npm install dauria`

* Latest githubbed version: `npm install https://github.com/Mithgol/dauria/tarball/master`

The npm package does not contain the tests, they're published on GitHub only.

You may visit https://github.com/Mithgol/dauria#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Using Dauria

When you `require()` the installed module, you get an object that has the following method:

### getBase64DataURI(sourceBuffer, MIME)

Returns a string containing the `data:...` URI that represent the given source Buffer in the base64-encoded form.

An optional second parameter (`MIME`) suggests the MIME type of the given Buffer. If the parameter is not given, `'application/octet-stream'` is used.

## Testing Dauria

[![(build testing status)](https://travis-ci.org/Mithgol/dauria.svg?branch=master)](https://travis-ci.org/Mithgol/dauria)

The tests are not included in the npm package of the module (to keep it small). Use the version from GitHub.

It is necessary to install [Mocha](http://visionmedia.github.io/mocha/) and [JSHint](http://jshint.com/) for testing.

* You may install Mocha globally (`npm install mocha -g`) or locally (`npm install mocha` in the directory of Dauria).

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of Dauria).

After that you may run `npm test` (in the directory of Dauria).

## License

MIT license (see the `LICENSE` file), with the following exceptions:

* The file `test/red-dot-5px.png` is taken from Wikipedia where it has been [released into the public domain](http://en.wikipedia.org/wiki/File%3aRed-dot-5px.png) by [Johan Elisson.](http://en.wikipedia.org/wiki/User%3aJohan_Elisson)

* The file `test/larry.gif` is decoded from [RFC2397](http://tools.ietf.org/html/rfc2397) where it was given as an example. (RFC2397's Full Copyright Statement permits publishing and distribution of derivative works that assist in its implementation.)
