'use strict';

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var jsYaml = require('js-yaml');

var SOURCE_ROOT = '../src/content';
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
        result += jsYaml.dump(tldr, {lineWidth: 1024});
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
      var result = '';
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
            result += jsYaml.dump(tldr, {lineWidth: 1024});
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

function replaceIncludeCode(markdown, lang, dir) {
  var relPath = 'web' + dir.replace('src/content/', '');
  relPath = relPath.replace(lang, '');
  if (!relPath.endsWith('/')) {
    relPath += '/';
  }
  relPath = relPath.replace('web..//fundamentals', 'web/fundamentals');
  var items = markdown.match(/{% include_code(.*?)%}/g);
  if (items) {
    items.forEach(function(item) {
      var sourceItem = item;
      item = item.replace('include_code', 'includecode adjust_indentation="auto" ');
      item = item.replace(/src=['"]?(.*?)['" ]/, 'content_path="' + relPath + '$1" ');
      item = item.replace(/snippet=['"]?(.*?)['" ]/, 'region_tag="$1" ');
      item = item.replace(/lang=['"]?(.*?)['" ]/, '');
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

function replaceLinkSample(markdown, lang, dir) {
  var re = /{% link_sample (.*?)\s?%}[\n\r]?(.*?)[\n\r]?{%\s?endlink_sample\s?%}/gm;
  var items = markdown.match(re);
  if (items) {
    re = /{% link_sample (.*?)\s?%}[\n\r]?(.*?)[\n\r]?{%\s?endlink_sample\s?%}/;
    items.forEach(function(item) {
      var sourceItem = item;
      var regEx = re.exec(item);
      if (regEx && regEx.length === 3) {
        var url = SAMPLES_PATH + dir.replace('src/content', '');
        url = url.replace('/' + lang + '/', '');
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

function hideTLDRsFromTOC(markdown) {
  var re = /(#{1,6} TL;DR)[ ]?\n/gm;
  var items = markdown.match(re);
  if (items) {
    items.forEach(function(item) {
      var sourceItem = item;
      item = item.replace(re, '$1 {: .hide-from-toc }\n');
      markdown = markdown.replace(sourceItem, item);
    });
  }
  return markdown;
}

function replaceFailedTags(markdown) {
  var re = /\!\<tag:yaml\.org,2002:js\/undefined>/gm;
  var replaceWith = '{# wf_TODO #}\n';
  replaceWith += 'Warning: A tag here did NOT convert properly, please fix!';
  markdown = markdown.replace(re, replaceWith);
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

function getMetaFromEnglish(sourcePath) {
  var result = {
    authors: [],
    publishedOn: '2000-01-01'
  };
  var reAuthors = /{% include "_shared\/contributors\/(.*?)\.html" %}\n/gm;
  var rePublishedOn = /{# wf_published_on: (.*?) #}/gm;
  var fileName = path.join(SOURCE_ROOT, 'en', sourcePath);
  try {
    fileName = fileName.replace('.markdown', '.md');
    var enFile = fs.readFileSync(fileName, 'utf8');
    var authors = enFile.match(reAuthors);
    if (authors) {
      authors.forEach(function(author) {
        result.authors.push(author.replace(reAuthors, '$1'));
      });
    }
    var publishedOn = enFile.match(rePublishedOn);
    if (publishedOn && publishedOn[0]) {
      result.publishedOn = publishedOn[0].replace(rePublishedOn, '$1');
    }
  } catch (ex) {
    console.log(' - Unable to get EN metadata for:', sourcePath);
    result.authors = ['TODO'];
    result.publishedOn = '2000-01-01';
  }
  return result;
}

function stripOldClasses(markdown) {

  markdown = markdown.replace('class=""', '');
  return markdown;
}

function migrateFile(lang, section, directory, file) {
  var dirPath = path.join(SOURCE_ROOT, lang, section, directory);
  var fileName = path.join(SOURCE_ROOT, lang, section, directory, file);
  console.log(fileName);
  var source = fs.readFileSync(fileName, 'utf8');
  var yamlEndsAt = source.indexOf('---\n', 10);
  var yaml = jsYaml.safeLoad(source.substring(0, yamlEndsAt));
  var markdown = source.substring(yamlEndsAt);
  markdown = markdown.replace('---\n', '');
  
  if (lang !== 'en') {
    var enMeta = getMetaFromEnglish(path.join(section, directory, file));
    yaml.authors = enMeta.authors;
    yaml.published_on = enMeta.publishedOn;
  }

  var topOfDoc = '';
  topOfDoc += 'project_path: /web/_project.yaml\n';
  topOfDoc += 'book_path: /web/' + section + '/_book.yaml\n';
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
  markdown = replaceIncludeCode(markdown, lang, dirPath);
  markdown = replaceTakeaway(markdown, yaml);
  markdown = replaceNote(markdown, yaml);
  markdown = replaceHighlightedCode(markdown);
  markdown = replaceLinkSample(markdown, lang, dirPath);
  markdown = removeIntroP(markdown);
  markdown = replaceYTVideo(markdown);
  markdown = replaceUdacity(markdown, yaml);
  markdown = hideTLDRsFromTOC(markdown);
  markdown = stripOldClasses(markdown);

  if (yaml.layout === 'updates/post') {
    markdown += '\n\n';
    markdown += '{# wf_add_comment_widget #}\n';
  }

  markdown = replaceFailedTags(markdown);

  var result = topOfDoc + markdown;
  var newFile = fileName.replace('.markdown', '.md');
  fs.writeFileSync(newFile, result);
  fs.unlinkSync(fileName);
  return {
    title: yaml.title,
    path: newFile
  };
}

function migrate(lang, section, directory, recursive) {
  var fullPath = path.join(SOURCE_ROOT, lang, section, directory);
  var files = fs.readdirSync(fullPath);
  files.forEach(function(file) {
    var fileStat = fs.statSync(path.join(fullPath, file));
    if (fileStat.isDirectory() && recursive === true) {
      migrate(lang, section, path.join(directory, file), true);
    } else if (file.endsWith('.markdown')) {
      try {
        migrateFile(lang, section, directory, file);
      } catch (ex) {
        console.log('Failed trying to convert:', path.join(fullPath, file));
        console.log(ex.stack);
        console.log(ex);
      }
    }
  });
}

var lang = 'ru';
var section = 'fundamentals';
var directory = 'design-and-ui/media/images';
var recursive = false;
migrate(lang, section, directory, recursive);


