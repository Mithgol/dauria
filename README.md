This Node.js module for <b>Da</b>ta <b>URI a</b>pplications is called **Dauria** (after a part of [Transbaikal](http://en.wikipedia.org/wiki/Transbaikal)).

It performs conversions between Node.js [Buffers](http://nodejs.org/docs/latest/api/buffer.html) and [RFC2397-compliant](http://tools.ietf.org/html/rfc2397) Data URIs, or vice versa.

It is tested against Node.js v0.8.x, Node.js v0.10.x, Node.js v0.12.x and the latest stable version of io.js.

## Installing Dauria

[![(npm package version)](https://nodei.co/npm/dauria.png?downloads=true)](https://npmjs.org/package/dauria) [![(a histogram of downloads)](https://nodei.co/npm-dl/dauria.png?months=3&height=2)](https://npmjs.org/package/dauria)

* Latest packaged version: `npm install dauria`

* Latest githubbed version: `npm install https://github.com/Mithgol/dauria/tarball/master`

The npm package does not contain the tests, they're published on GitHub only.

You may visit https://github.com/Mithgol/dauria#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Using Dauria

When you `require()` the installed module, you get an object that has the following methods:

### getBase64DataURI(sourceBuffer, MIME)

Returns a string containing the `data:...` URI that represent the given source Buffer in the base64-encoded form.

An optional second parameter (`MIME`) suggests the MIME type of the given Buffer. If the parameter is not given, `'application/octet-stream'` is used.

**Example:**

![(screenshot)](https://cloud.githubusercontent.com/assets/1088720/3493753/6eb879ea-05bb-11e4-8eb8-f1ac24657969.gif)

### parseDataURI(dataURI)

Parses the given Data URI and returns an object with the following properties:

* `MIME` — MIME content type in the form `type/subtype` as explained in [RFC2045 Section 5.2](http://tools.ietf.org/html/rfc2045#section-5.2). If not given in the URI, `MIME` becomes `'text/plain'` by default (as recommended by [RFC2397](http://tools.ietf.org/html/rfc2397) in section 2).

* `mediaType` — MIME content type with the semicolon-separated list of parameters (if any) in the form `parameter=value` (some values may appear urlencoded, and Dauria does not decode them). If not given in the URI, `mediaType` becomes `'text/plain;charset=US-ASCII'` by default (as recommended by [RFC2397](http://tools.ietf.org/html/rfc2397) in section 2).

* `buffer` — Node.js [Buffer](http://nodejs.org/docs/latest/api/buffer.html) containing the data decoded from the given Data URI. Hexadecimal URL encoding (such as `'%20'` for a whitespace) and base64 encoding are both supported (the latter must be indicated by the string `';base64'` before the first comma in the given Data URI).

* `charset` — the value of the first `'charset=...'` parameter encountered in `mediaType`. If `mediaType` does not contain any charset parameters, `charset` becomes `'US-ASCII'`. However, if `MIME` does not start with `'text/'`, then `charset` becomes `null` regardless of any parameters.

* `text` — a JavaScript string containing the text decoded from `buffer` using `charset`. However, if `MIME` does not start with `'text/'`, then `text` becomes `null`. It also becomes `null` if the [iconv-lite](https://github.com/ashtuchkin/iconv-lite) module does not know the encountered `charset`.

If the given `dataURI` is not in fact a Data URI (does not start with `'data:'` or does not contain a comma), an error is thrown.

**Example:**

![(screenshot)](https://cloud.githubusercontent.com/assets/1088720/3493769/9eae25c8-05bb-11e4-8984-6b21619f6200.gif)

## Testing Dauria

[![(build testing status)](https://img.shields.io/travis/Mithgol/dauria/master.svg?style=plastic)](https://travis-ci.org/Mithgol/dauria)

The tests are not included in the npm package of the module (to keep it small). Use the version from GitHub.

It is necessary to install [Mocha](http://visionmedia.github.io/mocha/) and [JSHint](http://jshint.com/) for testing.

* You may install Mocha globally (`npm install mocha -g`) or locally (`npm install mocha` in the directory of Dauria).

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of Dauria).

After that you may run `npm test` (in the directory of Dauria).

## License

MIT license (see the `LICENSE` file), with the following exceptions:

* The file `test/red-dot-5px.png` is taken from Wikipedia where it has been [released into the public domain](http://en.wikipedia.org/wiki/File%3aRed-dot-5px.png) by [Johan Elisson.](http://en.wikipedia.org/wiki/User%3aJohan_Elisson)

* The file `test/larry.gif` is decoded from [RFC2397](http://tools.ietf.org/html/rfc2397) where it was given as an example. (RFC2397's Full Copyright Statement permits publishing and distribution of derivative works that assist in its implementation.)
