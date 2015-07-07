'use strict';

var http = require('http');
var https = require('https');
var url = require('url');
var through = require('through2');

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-google-web-fonts';

var FF_UA = 'Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0';
var CHROME_UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/44.0.2403.61 Safari/537.36';
var IE_8_UA = 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; ' +
  'Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 3.3.69573; WOW64; en-US)';


function googleWebFonts(config) {
  if (!config.fontsurl) {
    throw new PluginError(PLUGIN_NAME, 'You must provide an \'fontsurl\' ' +
      'parameter.');
  }

  return through.obj(function(file, enc, cb) {
    produceCSS(config)
      .then(function(result) {
        if (!config.replaceAll) {
          result = '\n' + result;
        }

        var newCSSBuffer = new Buffer(String(result));
        if (config.replaceAll) {
          file.contents = Buffer.concat([
              newCSSBuffer,
            ],
            newCSSBuffer.length);
        } else {
          file.contents = Buffer.concat([
              file.contents,
              newCSSBuffer,
            ],
            file.contents.length + newCSSBuffer.length);
        }
        cb(null, file);
      })
      .catch(function(err) {
        throw new PluginError(PLUGIN_NAME,
          'Failed to retrieve all required fonts');
      });
  });
}

function produceCSS(config) {
  return Promise.all([
    makeRequest(url.parse(config.fontsurl), IE_8_UA),
    makeRequest(url.parse(config.fontsurl), FF_UA),
    makeRequest(url.parse(config.fontsurl)),
    makeRequest(url.parse(config.fontsurl), CHROME_UA),
  ])
  .then(function(arrayOfResults) {
    // Merge all results apart from Chrome where we'll wrap with @supports
    var fontSrcs = [];
    var srcRegex = new RegExp('src:\s?(.*);', 'i');
    var parameterRegex = new RegExp('(\\w*)\\(([^\\)]*)\\)', 'g');
    var localFonts = {};
    for (var i = 0; i < (arrayOfResults.length - 1); i++) {
      var result = arrayOfResults[i];

      var matches = srcRegex.exec(result);
      if (!matches) {
        throw new PluginError(PLUGIN_NAME, 'Error parsing response from ' +
          'Google web fonts.');
      }

      var fontFaceSrcString = matches[1].trim();

      while ((matches = parameterRegex.exec(fontFaceSrcString)) !== null) {
        // This will be url, local, or format
        var attributeName = matches[1];
        var value = matches[2];

        if (attributeName === 'url') {
          if (value.indexOf('eot', value.length - 'eot'.length) !== -1) {
            value = value + '#';
            fontSrcs.push(attributeName + '(' + value + ') ' +
              'format(\'embedded-opentype\')');
            continue;
          }
        } else if (attributeName === 'local') {
          // We have a local element here, we only need this once in a loop
          if (typeof localFonts[value] === 'undefined') {
            // This is a new local font so add InfoPath
            localFonts[value] = i;
            fontSrcs.push(attributeName + '(' + value + ')');
          }
          continue;
        } else if (attributeName === 'format') {
          fontSrcs[fontSrcs.length - 1] = fontSrcs[fontSrcs.length - 1] +
            ' ' + attributeName + '(' + value + ')';
          continue;
        }

        fontSrcs.push(attributeName + '(' + value + ')');
      }
    }

    var srcString = '';
    for (i = 0; i < fontSrcs.length; i++) {
      srcString += fontSrcs[i];
      if (i + 1 < fontSrcs.length) {
        srcString += ', ';
      }
    }

    var srcStringToReplace = srcRegex.exec(arrayOfResults[0])[1].trim();
    var finalCSS = arrayOfResults[0].replace(srcStringToReplace, srcString);

    var chromeResponse = arrayOfResults[arrayOfResults.length - 1];

    var supportsCSS = '\n\n@supports (unicode-range: U+0) {\n\n';
    if (config.sassVariant) {
      supportsCSS = '\n\n$unicodeVariable: \'U+0\';\n' +
        '@supports (unicode-range: #{$unicodeVariable}) {\n\n';
    }

    finalCSS += supportsCSS +
      chromeResponse +
      '\n}';
    return finalCSS;
  }, function() {
    // one or more failed
    throw new PluginError(PLUGIN_NAME,
      'Failed to retrieve all required fonts');
  });
}

function makeRequest(uri, useragent) {
  return new Promise(function(resolve, reject) {
    var request;
    var options = {
      hostname: uri.host,
      path: uri.path,
      headers: {
      }
    };

    if (useragent) {
      options.headers['user-agent'] = useragent;
    }

    if (uri.port) {
      options.port = uri.port;
    }

    if (uri.method) {
      options.method = uri.method;
    }

    if (uri.authorization) {
      options.headers.Authorization = uri.authorization;
    }

    function handleResponse(response) {
      var result = '';
      response.setEncoding('utf8');
      response.on('data', function(chunk) {
        result += chunk;
      });

      response.on('end', function() {
        resolve(result);
      });
    }

    if (uri.secure || uri.protocol === 'https:') {
      request = https.request(options, handleResponse);
    } else {
      request = http.request(options, handleResponse);
    }

    request.on('error', function(error) {
      reject(error);
    });

    var timeout = 60000;
    if (uri.timeout) {
      timeout = uri.timeout;
    }

    request.setTimeout(timeout, function() {
      request.abort();
    });

    request.end();
  });
}

module.exports = googleWebFonts;
