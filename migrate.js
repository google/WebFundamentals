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
  var relPath = 'web' + dir.replace('src/content/en', '');
  if (!relPath.endsWith('/')) {
    relPath += '/';
  }
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
  var re = /{% link_sample (.*?)\s?%}[\n\r]?(.*?)[\n\r]?{%\s?endlink_sample\s?%}/gm;
  var items = markdown.match(re);
  if (items) {
    re = /{% link_sample (.*?)\s?%}[\n\r]?(.*?)[\n\r]?{%\s?endlink_sample\s?%}/;
    items.forEach(function(item) {
      var sourceItem = item;
      var regEx = re.exec(item);
      if (regEx && regEx.length === 3) {
        var url = SAMPLES_PATH + dir.replace('src/content/en/', '');
        if (!url.endsWith('/')) {
          url += '/';
        }
        url += regEx[1].replace('_code/', '');
        item = '<a href="' + url + '">' + regEx[2] + '</a>';
        markdown = markdown.replace(sourceItem, item);
      }
    });
  }
  return markdown;
}

function replaceYTVideo(markdown) {
  var items = markdown.match(/{% ytvideo ([\w-]*) %}/g);
  if (items) {
    items.forEach(function(item) {
      var sourceItem = item;
      item = item.replace('{% ytvideo', '');
      item = item.replace('%}', '');
      item = item.trim();
      var video = getYoutubeMarkup(item);
      markdown = markdown.replace(sourceItem, video);
    });
  }
  return markdown;
}

function getYoutubeMarkup(id) {
  var video = '<div class="video-wrapper">\n';
  video += '  <iframe class="devsite-embedded-youtube-video" ';
  video += 'data-video-id="' + id + '"\n          ';
  video += 'data-autohide="1" data-showinfo="0" frameborder="0" ';
  video += 'allowfullscreen>\n';
  video += '  </iframe>\n</div>';
  return video;
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

function replaceUdacity(markdown, yaml) {
  if (yaml.udacity) {
    var udacity = yaml.udacity;
    if (udacity.title && udacity.image && udacity.description && udacity.id) {
      var re = /{% include fundamentals\/udacity_course.liquid.*?%}/m;
      var item = markdown.match(re);
      if (item) {
        var newContent = '';
        newContent += '\n## ' + udacity.title + '\n';
        newContent += '<!-- TODO: Verify Udacity course fits here -->\n';
        newContent += '<div class="attempt-right">\n';
        newContent += '  <figure>\n';
        newContent += '    <img src="' + udacity.image + '">\n';
        newContent += '  </figure>\n</div>\n\n';
        newContent += udacity.description + '\n\n';
        newContent += '[View Course](https://udacity.com/' + udacity.id;
        newContent += '){: .external }\n\n';
        markdown = markdown.replace(item, newContent);
      }
    } else {
      console.warn(' - Missing Udacity tags, wasn\'t able to add Udacity block.');
    }
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
  topOfDoc += 'book_path: /web/shows/_book.yaml\n';
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
  if (yaml.tags) {
    var tagList = yaml.tags.join(',');
    topOfDoc += '{# wf_tags: ' + tagList + ' #}\n';
  }
  if (yaml.featured_image) {
    topOfDoc += '{# wf_featured_image: ' + yaml.featured_image + ' #}\n';
  }
  if (yaml.youtubeID) {
    topOfDoc += '{# wf_youtube_id: ' + yaml.youtubeID + ' #}\n';
  }
  if (yaml.audio_url) {
    topOfDoc += '{# wf_audio_url: ' + yaml.audio_url + ' #}\n';
  }
  if (yaml.podcast_image_url) {
    topOfDoc += '{# wf_audio_url: ' + yaml.podcast_image_url + ' #}\n';
  }
  if (yaml.podcast_feed_url) {
    topOfDoc += '{# wf_audio_url: ' + yaml.podcast_feed_url + ' #}\n';
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
  if (yaml.translators) {
    topOfDoc += '\n\nTranslated By: \n\n';
    yaml.translators.forEach(function(translator) {
      topOfDoc += '{% include "_shared/contributors/' + translator + '.html\" %}\n';
    });
  }
  topOfDoc += '\n\n';
  if (yaml.youtubeID) {
    topOfDoc += getYoutubeMarkup(yaml.youtubeID) + '\n\n';
  }
  markdown = markdown.replace(/{{site.WFBaseUrl}}/g, '/web');
  markdown = markdown.replace('{% include shared/toc.liquid %}\n', '');
  markdown = markdown.replace(/{{ ?page.description ?}}/g, yaml.description);
  markdown = replaceIncludeCode(markdown, dir);
  markdown = replaceTakeaway(markdown, yaml);
  markdown = replaceNote(markdown, yaml);
  markdown = replaceHighlightedCode(markdown);
  markdown = replaceLinkSample(markdown, dir);
  markdown = removeIntroP(markdown);
  markdown = replaceYTVideo(markdown);
  markdown = replaceUdacity(markdown, yaml);

  if (yaml.layout === 'updates/post') {
    markdown += '\n\n';
    markdown += '{# wf_add_comment_widget #}\n';
  }

  var result = topOfDoc + markdown;
  var newFile = path.join(dir, file).replace('.markdown', '.md');
  fs.writeFileSync(newFile, result);
  fs.unlinkSync(path.join(dir, file));
  return {
    title: yaml.title,
    path: newFile
  };
}

function migrateDirectory(dir, recursive) {
  var files = fs.readdirSync(dir);
  files.forEach(function(file) {
    var fileStat = fs.statSync(path.join(dir, file));
    if (fileStat.isDirectory() && recursive === true) {
      migrateDirectory(path.join(dir, file), true);
    } else if (file.endsWith('.markdown')) {
      try {
        migrateFile(dir, file);
      } catch (ex) {
        console.log('Failed trying to convert:', path.join(dir, file));
        console.log(ex);
      }
    }
  });
}

migrateDirectory('./src/content/en/fundamentals/getting-started/primers/', false);

