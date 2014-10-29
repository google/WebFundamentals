/* jshint strict: true, node:true, browser:false */

'use strict';

var md5 = require('blueimp-md5');
var YAML = require('js-yaml');
var fs = require('fs');
var marked = require('marked');
var path = require('path');
var under = require('underscore');

if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
  });
}

function writeArbs(filename, obj) {
  under.each(obj, function(val, key) {
    if (typeof val === 'string') {
      val = val.replace(/<code>(.+?)<\/code>/g, '{@code>$1<code}');
      val = val.replace(/(<.+?>)/g, '{@$1}');
      obj[key] = val;
    }
  });
  fs.writeFileSync(filename, JSON.stringify(obj, null, 2));
}

function readArbs(filename) {
  var arbs = fs.readFileSync(filename);
  arbs = JSON.parse(arbs.toString());
  under.each(arbs, function(val, key) {
    if (typeof val === 'string') {
      val = val.replace(/\{@(<.+?>)\}/g, '$1');
      val = val.replace(/\{@code>(.+?)<\/code\}/g, '<code>$1</code>');
      arbs[key] = val;
    }
  });
  return arbs;
}


var yamlKeys = [
  'title',
  'description',
  'introduction',
  'key-takeaways',
  'notes',
  'remember'
];

// Parses the HTML and extracts any responsive table headers
// (data-th="something"), then hashes the entire string and stores the value
// for translation.
function extractResponsiveTableHeaders(html) {
  var result = {};
  var headers = html.match(/data-th="(.+?)"/g);
  under.each(headers, function(header) {
    var hash = md5.md5(header);
    result[hash] = header.match(/data-th="(.+?)"/)[1];
  });
  return result;
}

// Parses the HTML and replaces any responsive table headers
// (data-th="something") with their translated versions.
function replaceResponsiveTableHeaders(html, arb) {
  var headers = html.match(/data-th="(.+?)"/g);
  under.each(headers, function(header) {
    var hash = md5.md5(header);
    var str = arb[hash];
    if (typeof str === 'string') {
      var re = new RegExp('data-th="' + header + '"', 'g');
      html = html.replace(re, 'data-th="' + str + '"');
    }
  });
  return html;
}

function replaceStringsInYaml(content, arb) {
  var yaml = YAML.load(content);
  recurseYaml(yaml, function(key, val, yml) {
    var hash = md5.md5(val);
    var translatedString = arb[hash];
    if (translatedString) {
      yml[key] = translatedString;
    }
  }, false);
  return YAML.dump(yaml);
}

function extractStringsFromYaml(yaml) {
  var result = {};
  recurseYaml(yaml, function(key, val) {
    var hash = md5.md5(val);
    result[hash] = val;
  }, false);
  return result;
}

function recurseYaml(yaml, callback, allChildren) {
  under.each(yaml, function(val, key) {
    if (typeof val === 'string') {
      if ((yamlKeys.indexOf(key) >= 0) || (allChildren === true)) {
        callback(key, val, yaml);
      }
    } else if (typeof val === 'object') {
      if (yamlKeys.indexOf(key) >= 0) {
        recurseYaml(val, callback, true);
      } else {
        recurseYaml(val, callback, allChildren);
      }
    }
  });
}

function recurseDir(dir, rootDir, callback) {
  if (dir.indexOf('_code') === -1) {
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
      var file = path.join(dir, files[i]);
      var stat = fs.statSync(file);
      if (stat.isDirectory()) {
        recurseDir(file, rootDir, callback);
      } else {
        if (file.indexOf('DS_Store') === -1) {
          callback(file);
        }
      }
    }
  }
}

/*

// TODO: Add content here

*/

var standardString = '\n\n<div mdx id="WonderLand">Down the rabbit hole</div>';

var renderer = new marked.Renderer();

// Block level elements
renderer.code = function(code) {
  return '<!-- L10N_TODO: Check code spacing -->\n' + code + '\n\n';
};
renderer.heading = function(text, level) {
  var id = text.toLowerCase().replace(/[^\w]+/g, '-');
  var result = '<h' + level + ' id=\"' + id + '\" mdx>' +
    text + '</h' + level + '>\n\n';
  return result;
};
renderer.list = function(body, ordered) {
  if (ordered === true) {
    body = '<ol mdx>\n' + body.replace(/mdli/g, 'mdol') + '</ol>\n\n';
  } else {
    body = '<ul mdx>\n' + body.replace(/mdli/g, 'mdul') + '</ul>\n\n';
  }
  return body;
};
renderer.listitem = function(text) {
  return '  <li mdli>' + text + '</li>\n';
};
renderer.paragraph = function(text) {
  return text + '\n\n';
};

// Inline elements
renderer.link = function(href, title, text) {
  return '<a mdx href=\"' + href + '\">' + text + '</a>';
};
renderer.strong = function(text) {
  return '<b mdx>' + text + '</b>';
};
renderer.em = function(text) {
  return '<u mdx>' + text + '</u>';
};
renderer.codespan = function(text) {
  return '<code class=\"notranslate\">' + text + '</code>';
};
renderer.image = function(href, title, text) {
  var result = '<img src=\"' + href + '\"';
  if (text) {
    result += ' alt=\"' + text + '\"';
  }
  if (title) {
    result += ' title=\"' + title + '\"';
  }
  return result + '>';
};

function markdownToHTML(content) {
  var html = marked(content, {renderer: renderer, sanitize: false});
  return html;
}

function replaceAllUsingRegEx(str, regexes) {
  var result = str;
  for (var i = 0; i < regexes.length; i++) {
    var re = new RegExp(regexes[i][0], 'g');
    result = result.replace(re, regexes[i][1]);
  }
  return result;
}

function wrapJekyllTags(html) {
  var regexes = [
    ['({%.*%})', '<div class="notranslate">$1</div>'],
    ['({% highlight .* %})</div>', '$1'],
    ['<div class="notranslate">({% endhighlight %}</div>)', '$1'],
    ['({% comment %})</div>', '$1'],
    ['<div class="notranslate">({% endcomment %}</div>)', '$1']
  ];
  return replaceAllUsingRegEx(html, regexes);
}

function htmlToMarkdown(html) {
  var regexes = [
    ['\\n\\n<div id="WonderLand" mdx="">(.+?)</div>', ''],
    ['<div class="notranslate">(.+?)</div>', '$1'],
    ['<[o|u]l mdx="">([\\S\\s]+?)</[o|u]l>', '$1'],
    ['<li mdol="">([\\S\\s]+?)</li>', '1. $1'],
    ['<li mdul="">([\\S\\s]+?)</li>', '* $1'],
    ['<h1(?: id="([\\S\\s]+?)")? mdx="">(.+?)</h1>', '# $2 {#$1}'],
    ['<h2(?: id="([\\S\\s]+?)")? mdx="">(.+?)</h2>', '## $2 {#$1}'],
    ['<h3(?: id="([\\S\\s]+?)")? mdx="">(.+?)</h3>', '### $2 {#$1}'],
    ['<h4(?: id="([\\S\\s]+?)")? mdx="">(.+?)</h4>', '#### $2 {#$1}'],
    ['<h5(?: id="([\\S\\s]+?)")? mdx="">(.+?)</h5>', '##### $2 {#$1}'],
    ['<h6(?: id="([\\S\\s]+?)")? mdx="">(.+?)</h6>', '###### $2 {#$1}'],
    ['<code class="notranslate">(.+?)</code>', '`$1`'],
    ['<b mdx="">(.+?)</b>', '**$1**'],
    ['<u mdx="">(.+?)</u>', '*$1*'],
    ['<div class="notranslate">({% highlight.+?%})', '$1'],
    ['({% endhighlight %})</div>', '$1'],
    ['<div class="notranslate">({% comment %})', '$1'],
    ['({% endcomment %})</div>', '$1'],
    ['(&quot;)+?(?=[\\S\\s]+?%})', '"']
  ];
  return replaceAllUsingRegEx(html, regexes);
}

function gttCleanup(html) {
  var injectedHeader = '<html dir="ltr"><head></head><body dir="ltr">' +
    '<div class="notranslate">\n';
  if (html.trim().indexOf(injectedHeader) === 0) {
    html = html.replace(injectedHeader, '<div class="notranslate">\n');
    html = html.replace('---\n</div>\n', '---\n');
    html = html.substring(0, html.length - 14);
  }
  return html;
}

exports.markdownToHTML = markdownToHTML;
exports.wrapJekyllTags = wrapJekyllTags;
exports.htmlToMarkdown = htmlToMarkdown;
exports.standardString = standardString;
exports.writeArbs = writeArbs;
exports.readArbs = readArbs;
exports.gttCleanup = gttCleanup;
exports.recurseDir = recurseDir;
exports.extractStringsFromYaml = extractStringsFromYaml;
exports.replaceStringsInYaml = replaceStringsInYaml;
exports.extractResponsiveTableHeaders = extractResponsiveTableHeaders;
exports.replaceResponsiveTableHeaders = replaceResponsiveTableHeaders;
