'use strict';

var fs = require('fs');
var moment = require('moment');
var jsYaml = require('js-yaml');

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

function recurseObject(path, obj) {
  var currentNode = path.shift();
  if (path.length === 0) {
    return obj[currentNode];
  }
  return recurseObject(path, obj[currentNode]);
}

function replaceTakeaway(markdown, yaml) {
  var items = markdown.match(/{% include shared\/takeaway.liquid(.*?)%}/g);
  if (items) {
    items.forEach(function(item) {
      var result = '## TL;DR\n';
      var re = /list=['"]?(.*?)['" ]/g;
      var tldrObj = re.exec(item);
      if (tldrObj) {
        var k = tldrObj[1].replace('page.', '');
        var tldr = recurseObject(k.split('.'), yaml);
        result += jsYaml.dump(tldr, {lineWidth: 500});
      }
      markdown = markdown.replace(item, result);
    });
  }
  return markdown;
}

function replaceNote(markdown, yaml) {
  var items = markdown.match(/{% include shared\/remember.liquid(.*?)%}/g);
  if (items) {
    items.forEach(function(item) {
      var result = '<!-- TODO: Verify note type! -->\n';
      result += 'Note: ';
      var re = /list=['"]?(.*?)['" ]/g;
      var tldrObj = re.exec(item);
      if (tldrObj) {
        var k = tldrObj[1].replace('page.', '');
        var tldr = recurseObject(k.split('.'), yaml);
        if (tldr.length === 1) {
          result += tldr[0];
        } else {
          result += jsYaml.dump(tldr, {lineWidth: 500});
        }
      }
      markdown = markdown.replace(item, result);
    });
  }
  return markdown;
}

function replaceIncludeCode(markdown, dir) {
  var relPath = 'web' + dir.substring(dir.indexOf('/fundamental'));
  var items = markdown.match(/{% include_code(.*?)%}/g);
  if (items) {
    items.forEach(function(item) {
      var sourceItem = item;
      item = item.replace('include_code', 'includecode');
      item = item.replace(/src=['"]?(.*?)['" ]/, 'content_path="' + relPath + '$1" ');
      item = item.replace(/snippet=['"]?(.*?)['" ]/, 'region_tag="$1" ');
      item = '<pre class="prettyprint">\n' + item + '\n</pre>';
      markdown = markdown.replace(sourceItem, item);
    });
  }
  return markdown;
}

function replaceHighlightedCode(markdown) {
  var items = markdown.match(/{% highlight \w* %}\n([\s\S]*?){% endhighlight %}/gm);
  if (items) {
    items.forEach(function(item) {
      var sourceItem = item;
      item = item.replace(/{% highlight .* %}/, '');
      item = item.replace(/{% endhighlight %}\n?/, '');
      item = item.replace(/\n/gm, '\n    ');
      markdown = markdown.replace(sourceItem, item);
    });
  }
  return markdown;
}

function removeIntroP(markdown) {
  var re = /<p class=["' ]intro["' ]>[\r\n]?([\s\S]*?)[\n\r]?<\/p>/gm;
  var items = markdown.match(re);
  if (items) {
    items.forEach(function(item) {
      var sourceItem = item;
      item = item.replace(re, '$1');
      item = item.replace(/^[ ]+/gm, '');
      markdown = markdown.replace(sourceItem, item);
    });
  }
  return markdown;
}

function migrateFile(dir, file) {
  console.log(file);
  var source = fs.readFileSync(dir + file, 'utf8');
  var yamlEndsAt = source.indexOf('---\n', 10);
  var yaml = jsYaml.safeLoad(source.substring(0, yamlEndsAt));
  var markdown = source.substring(yamlEndsAt);
  markdown = markdown.replace('---\n', '');

  var topOfDoc = '';
  topOfDoc += 'project_path: /web/_project.yaml\n';
  topOfDoc += 'book_path: /web/fundamentals/_book.yaml\n';
  if (yaml.description) {
    topOfDoc += 'description: ' + yaml.description + '\n';
  }
  topOfDoc += '\n';
  topOfDoc += '{# wf_review_required #}\n';
  if (yaml.updated_on) {
    topOfDoc += '{# wf_updated_on: ';
    topOfDoc += moment(yaml.updated_on).format('YYYY-MM-DD') + ' #}\n';
  }
  if (yaml.published_on) {
    topOfDoc += '{# wf_published_on: ';
    topOfDoc += moment(yaml.published_on).format('YYYY-MM-DD') + ' #}\n';
  }
  if (yaml.title) {
    topOfDoc += '\n';
    topOfDoc += '# ' + yaml.title + ' {: .page-title }\n';
  }
  if (yaml.authors) {
    yaml.authors.forEach(function(author) {
      topOfDoc += '\n';
      topOfDoc += '{% include "_shared/contributors/' + author + '.html\" %}\n';
    });
  }
  markdown = markdown.replace('{% include shared/toc.liquid %}\n', '');
  markdown = markdown.replace(/{{ ?page.description ?}}/g, yaml.description);
  markdown = replaceIncludeCode(markdown, dir);
  markdown = replaceTakeaway(markdown, yaml);
  markdown = replaceNote(markdown, yaml);
  markdown = replaceHighlightedCode(markdown);
  markdown = removeIntroP(markdown);

  var result = topOfDoc + markdown;
  var newFile = dir + file.replace('.markdown', '.md');
  fs.writeFileSync(newFile, result);
}

function migrateDirectory(dir) {
  var files = fs.readdirSync(dir);
  files.forEach(function(file) {
    if (file.endsWith('.markdown')) {
      migrateFile(dir, file);
    }
  });
}

migrateDirectory('./src/content/en/fundamentals/performance/critical-rendering-path/');
