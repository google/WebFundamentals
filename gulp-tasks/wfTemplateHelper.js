/**
 * @fileoverview Helper utility to simplify handlebars template generation
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

var fs = require('fs');
var path = require('path');
var marked = require('marked');
var mkdirp = require('mkdirp');
var jsYaml = require('js-yaml');
var gutil = require('gulp-util');
var wfRegEx = require('./wfRegEx');
const wfHelper = require('./wfHelper');
var Handlebars = require('handlebars');
require('handlebars-helpers')();

Handlebars.registerHelper('formatDateAtom', function(dt) {
  return wfHelper.dateFormatAtom(dt);
});
Handlebars.registerHelper('formatDateISO', function(dt) {
  return wfHelper.dateFormatISO(dt);
});
Handlebars.registerHelper('formatDatePretty', function(dt) {
  return wfHelper.dateFormatPretty(dt);
});
Handlebars.registerHelper('formatDateRSS', function(dt) {
  return wfHelper.dateFormatRSS(dt);
});

// Renders a template using handlebases
function renderTemplate(templateFile, context, outputFile) {
  var ts = fs.readFileSync(templateFile, 'utf8');
  var template = Handlebars.compile(ts);
  var result = template(context);
  mkdirp.sync(path.dirname(outputFile));
  fs.writeFileSync(outputFile, result);
}

function getFullFeedEntries(articles) {
  var yamlCont = fs.readFileSync('./src/data/_contributors.yaml', 'utf8');
  var contributors = jsYaml.safeLoad(yamlCont);
  articles = articles.slice(0, GLOBAL.WF.maxArticlesInFeed);
  articles.forEach(function(article) {
    var content = fs.readFileSync(article.filePath, 'utf8');
    content = content.replace(/{#.*#}/g, '');
    content = content.replace(/{%.*%}/g, '');
    content = content.replace(wfRegEx.RE_BOOK_PATH, '');
    content = content.replace(wfRegEx.RE_PROJECT_PATH, '');
    content = content.replace(wfRegEx.RE_DESCRIPTION, '');
    content = content.replace(/{:.*}/g, '');
    article.content = marked(content);
    if (article.authors && article.authors[0]) {
      var author = contributors[article.authors[0]];
      if (author) {
        var authorName = '';
        if (author.name.given) {
          authorName += author.name.given + ' ';
        }
        if (author.name.family) {
          authorName += author.name.family;
        }
        article.feedAuthor = authorName.trim();
      }
    }
    article.rssPubDate = wfHelper.dateFormatRSS(article.datePublishedMoment);
    article.atomPubDate = wfHelper.dateFormatAtom(article.datePublishedMoment);
    article.atomUpdateDate = wfHelper.dateFormatAtom(article.dateUpdatedMoment);
  });
  return articles;
}

function generateFeeds(files, options) {
  gutil.log(' ', 'Generating RSS and ATOM feeds...');
  var context = {
    title: options.title,
    description: options.description,
    articles: getFullFeedEntries(files),
    host: 'https://developers.google.com',
    baseUrl: 'https://developers.google.com/web/',
    analyticsQS: '?utm_source=feed&amp;utm_medium=feed&amp;utm_campaign=root_feed'
  };
  if (options.baseUrl) {
    context.baseUrl = options.baseUrl;
  }
  if (options.section) {
    context.baseUrl += options.section + '/';
    context.analyticsQS = context.analyticsQS.replace('root_feed', options.section + '_feed');
  }
  // Note - use last updated instead of now to prevent feeds from being
  // generated every single time. This will only generate if the feeds are
  // actually updated.
  context.rssPubDate = wfHelper.dateFormatRSS(files[0].dateUpdatedMoment);
  context.atomPubDate = wfHelper.dateFormatAtom(files[0].dateUpdatedMoment);

  var template = path.join(GLOBAL.WF.src.templates, 'atom.xml');
  var outputFile = path.join(options.outputPath, 'atom.xml');
  renderTemplate(template, context, outputFile);

  template = path.join(GLOBAL.WF.src.templates, 'rss.xml');
  outputFile = path.join(options.outputPath, 'rss.xml');
  renderTemplate(template, context, outputFile);
}

function generatePodcastFeed(files, options) {
  gutil.log(' ', 'Generating podcast feed for', options.title);
  var context = {
    title: options.title,
    subtitle: options.subtitle,
    summary: options.summary,
    author: options.author,
    image: options.image,
    articles: files,
    host: 'https://developers.google.com',
    baseUrl: 'https://developers.google.com/web/'
  };
  if (options.baseUrl) {
    context.baseUrl = options.baseUrl;
  }
  // Note - use last updated instead of now to prevent feeds from being
  // generated every single time. This will only generate if the feeds are
  // actually updated.
  context.rssPubDate = wfHelper.dateFormatRSS(files[0].dateUpdatedMoment);
  var template = path.join(GLOBAL.WF.src.templates, 'shows', 'podcast.xml');
  var outputFile = path.join(options.outputPath, 'feed.xml');
  renderTemplate(template, context, outputFile);
}

function _generateListPage(files, options) {
  var context = {
    title: options.title,
    section: options.section,
    articles: files
  };
  var template = path.join(GLOBAL.WF.src.templates, 'article-list.md');
  if (options.template) {
    template = options.template;
  }
  var outputFile = options.outputFile;
  if (!outputFile) {
    outputFile = path.join(options.outputPath, 'index.md');
  }
  renderTemplate(template, context, outputFile);
}

function generateListPage(files, options) {
  gutil.log(' ', 'Generating article list page for', options.title);
  return _generateListPage(files, options);
}

function generateTOCbyMonth(files, options) {
  gutil.log(' ', 'Generating _toc.yaml for', options.title);
  var context = {
    year: options.year,
    title: options.title,
    section: options.section,
    months: wfHelper.splitByMonth(files).reverse()
  };
  var template = path.join(GLOBAL.WF.src.templates, 'toc-month.yaml');
  var outputFile = path.join(options.outputPath, '_toc.yaml');
  renderTemplate(template, context, outputFile);
}

function generateIndex(files, options) {
  gutil.log(' ', 'Generating index page...');
  var context = {
    description: options.description,
    section: options.section,
    articles: files
  };
  if (options.title) {
    context.title = options.title;
  }
  var template = path.join(GLOBAL.WF.src.templates, 'index.yaml');
  if (options.template) {
    template = options.template;
  }
  var outputFile = path.join(options.outputPath, '_index.yaml');
  if (options.outputFile) {
    outputFile = options.outputFile;
  }
  renderTemplate(template, context, outputFile);
}

function generateLatestWidget(files, options) {
  gutil.log(' ', 'Generating latest updates widget...');
  var context = {
    articles: files.splice(0, options.articlesToShow)
  };
  var template = path.join(GLOBAL.WF.src.templates, 'latest_articles.html');
  var outputFile = path.join(options.outputPath, '_shared', 'latest_articles.html');
  renderTemplate(template, context, outputFile);
}

function generateTagPages(files, options) {
  gutil.log(' ', 'Generating tag pages for ' + options.section + '...');
  var allTags = {};
  files.forEach(function(file) {
    var tags = file.tags;
    tags.forEach(function(tag) {
      tag = tag.toLowerCase();
      if (!allTags[tag]) {
        allTags[tag] = {
          tag: tag,
          articles: []
        };
      }
      allTags[tag].articles.push(file);
    });
  });
  var context = {
    title: options.title,
    tags: Object.keys(allTags).sort(),
    section: options.section
  };
  var tmpl = path.join(GLOBAL.WF.src.templates, 'tags', 'tag-index.md');
  var outputFile = path.join(options.outputPath, 'index.md');
  renderTemplate(tmpl, context, outputFile);
  tmpl = path.join(GLOBAL.WF.src.templates, 'tags' ,'tag_toc.yaml');
  outputFile = path.join(options.outputPath, '_toc.yaml');
  renderTemplate(tmpl, context, outputFile);
  Object.keys(allTags).forEach(function(key) {
    var name = options.section.replace(/(\w)(\w+[^s])(s|S)?\b/, (_, a, b) => a.toUpperCase() + b + 's');
    var opts = {
      title: 'All ' + name + ' tagged: ' + key + '',
      section: options.section,
      outputFile: path.join(options.outputPath, key + '.md')
    };
    _generateListPage(allTags[key].articles, opts);
  });
}

exports.generateLatestWidget = generateLatestWidget;
exports.generateIndex = generateIndex;
exports.generateFeeds = generateFeeds;
exports.generatePodcastFeed = generatePodcastFeed;
exports.generateListPage = generateListPage;
exports.generateTOCbyMonth = generateTOCbyMonth;
exports.generateTagPages = generateTagPages;
exports.renderTemplate = renderTemplate;
