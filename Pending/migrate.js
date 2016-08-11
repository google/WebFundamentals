'use strict';

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var jsYaml = require('js-yaml');

var SAMPLES_PATH = 'https://googlesamples.github.io/web-fundamentals/samples/';

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

function recurseObject(pathArray, obj) {
  var currentNode = pathArray.shift();
  if (pathArray.length === 0) {
    return obj[currentNode];
  }
  return recurseObject(pathArray, obj[currentNode]);
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
  var items = markdown.match(/{% include shared\/(remember|note).liquid(.*?)%}/g);
  if (items) {
    items.forEach(function(item) {
      var result = '<!-- TODO: Verify note type! -->\n';
      result += 'Note: ';
      var re = /list=['"]?(.*?)['" ]/g;
      var tldrObj = re.exec(item);
      if (tldrObj) {
        var k = tldrObj[1].replace('page.', '');
        var tldr = recurseObject(k.split('.'), yaml);
        if (Array.isArray(tldr)) {
          if (tldr.length === 1) {
            result += tldr[0];
          } else {
            result += jsYaml.dump(tldr, {lineWidth: 500});
          }
        } else {
          result += tldr;
        }
        markdown = markdown.replace(item, result);
      }
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
      item = item.replace(/{% highlight \w* %}/, '');
      item = item.replace(/{% endhighlight %}\n?/, '');
      item = item.replace(/\n/gm, '\n    ');
      markdown = markdown.replace(sourceItem, item);
    });
  }
  return markdown;
}

function replaceLinkSample(markdown, dir) {
  var re = /{% link_sample (.*?)\s?%}(.*?){%\s?endlink_sample\s?%}/gm;
  var items = markdown.match(re);
  if (items) {
    re = /{% link_sample (.*?)\s?%}(.*?){%\s?endlink_sample\s?%}/;
    items.forEach(function(item) {
      var sourceItem = item;
      var regEx = re.exec(item);
      if (regEx && regEx.length === 3) {
        var url = SAMPLES_PATH + dir.replace('./src/content/en/', '');
        url += regEx[1].replace('_code/', '');
        item = '<a href="' + url + '">' + regEx[2] + '</a>';
        markdown = markdown.replace(sourceItem, item);
      }
    });
  }
  return markdown;
}

function replaceYTVideo(markdown) {
  var items = markdown.match(/{% ytvideo (\w*) %}/g);
  if (items) {
    items.forEach(function(item) {
      var sourceItem = item;
      item = item.replace('{% ytvideo ', '');
      item = item.replace(' %}', '');
      var video = '<div class="video-wrapper">\n';
      video += '  <iframe class="devsite-embedded-youtube-video" ';
      video += 'data-video-id="' + item + '"\n          ';
      video += 'data-autohide="1" data-showinfo="0" frameborder="0" ';
      video += 'allowfullscreen>\n';
      video += '  </iframe>\n</div>';
      markdown = markdown.replace(sourceItem, video);
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
  console.log(path.join(dir, file));
  var source = fs.readFileSync(path.join(dir, file), 'utf8');
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
    topOfDoc += '\n';
    yaml.authors.forEach(function(author) {
      topOfDoc += '{% include "_shared/contributors/' + author + '.html\" %}\n';
    });
  }
  markdown = markdown.replace('{% include shared/toc.liquid %}\n', '');
  markdown = markdown.replace(/{{ ?page.description ?}}/g, yaml.description);
  markdown = replaceIncludeCode(markdown, dir);
  markdown = replaceTakeaway(markdown, yaml);
  markdown = replaceNote(markdown, yaml);
  markdown = replaceHighlightedCode(markdown);
  markdown = replaceLinkSample(markdown, dir);
  markdown = removeIntroP(markdown);
  markdown = replaceYTVideo(markdown);

  var result = topOfDoc + markdown;
  var newFile = path.join(dir, file).replace('.markdown', '.md');
  fs.writeFileSync(newFile, result);
}

function migrateDirectory(dir) {
  var files = fs.readdirSync(dir);
  files.forEach(function(file) {
    if (file.endsWith('.markdown')) {
      try {
        migrateFile(dir, file);
      } catch (ex) {
        console.log('Failed trying to convert:', path.join(dir, file));
        console.log(ex);
      }
    }
  });
}

migrateDirectory('./src/content/en/fundamentals/design-and-ui/input/touch/');
