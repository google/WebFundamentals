'use strict';

/*
    wfTemplateHelper.js
    TODO
 */

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var marked = require('marked');
var mkdirp = require('mkdirp');
var jsYaml = require('js-yaml');
var gutil = require('gulp-util');
var Handlebars = require('handlebars');
require('handlebars-helpers')();

function renderTemplate(templateFile, context, outputFile) {
  var ts = fs.readFileSync(templateFile, 'utf8');
  var template = Handlebars.compile(ts);
  var result = template(context);
  mkdirp.sync(path.dirname(outputFile));
  fs.writeFileSync(outputFile, result);
}

function splitArticlesByMonth(files) {
  var result = [];
  files.forEach(function(file) {
    var month = moment(file.datePublished).format('MM');
    month = parseInt(month, 10);
    if (!result[month]) {
      result[month] = {
        title: moment.months()[month - 1],
        articles: []
      };
    }
    result[month].articles.push(file);
  });
  return result;
}

function getFullFeedEntries(articles) {
  var yamlCont = fs.readFileSync('./src/data/_contributors.yaml', 'utf8');
  var contributors = jsYaml.safeLoad(yamlCont);
  articles = articles.slice(0, GLOBAL.WF.maxArticlesInFeed);
  articles.forEach(function(article) {
    var content = fs.readFileSync(article.filePath, 'utf8');
    content = content.replace(/{#.*#}/g, '');
    content = content.replace(/{%.*%}/g, '');
    content = content.replace(/book_path: .*\n/, '');
    content = content.replace(/project_path: .*\n/, '');
    content = content.replace(/description: .*\n/, '');
    content = content.replace(/{:.*}/g, '');
    article.content = marked(content);
    if (article.authors && article.authors[0]) {
      var author = contributors[article.authors[0]];
      var atomAuthorName = '';
      var rssAuthorName = '';
      if (author.name.given) {
        rssAuthorName += author.name.given + ' ';
        atomAuthorName += author.name.given + ' ';
      }
      if (author.name.family) {
        rssAuthorName += author.name.family;
        atomAuthorName += author.name.family + ' ';
      }
      article.rssAuthor = 'not@public.com' + ' (' + rssAuthorName.trim() + ')';
      article.atomAuthor = atomAuthorName.trim();
    }
    var rssPubDate = moment(article.datePublished);
    article.rssPubDate = rssPubDate.format('MM MMM YYYY HH:mm:ss [GMT]');
  });
  return articles;
}

function generateFeeds(files, options) {
  gutil.log(' ', 'Generating RSS and ATOM feeds...');
  var lastUpdated = files[0].datePublished;
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
  context.rssPubDate = moment(lastUpdated).format('MM MMM YYYY HH:mm:ss [GMT]');
  context.atomPubDate = moment(lastUpdated).format('YYYY-MM-DDTHH:mm:ss[Z]');

  var template = path.join(GLOBAL.WF.src.templates, 'atom.xml');
  var outputFile = path.join(options.outputPath, 'atom.xml');
  renderTemplate(template, context, outputFile);

  template = path.join(GLOBAL.WF.src.templates, 'rss.xml');
  outputFile = path.join(options.outputPath, 'rss.xml');
  renderTemplate(template, context, outputFile);
}

function _generateListPage(files, options) {
  var context = {
    title: options.title,
    section: options.section,
    articles: files
  };
  var tmpl = path.join(GLOBAL.WF.src.templates, 'article-list.md');
  var outputFile = options.outputFile;
  if (!outputFile) {
    outputFile = path.join(options.outputPath, 'index.md');
  }
  renderTemplate(tmpl, context, outputFile);
}

function generateListPage(files, options) {
  gutil.log(' ', 'Generating article list page for', options.title);
  return _generateListPage(files, options);
}

function generateTOCbyMonth(files, options) {
  gutil.log(' ', 'Generating _toc.yaml for', options.title);
  var context = {
    title: options.title,
    section: options.section,
    months: splitArticlesByMonth(files).reverse()
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
  var template = path.join(GLOBAL.WF.src.templates, 'index.yaml');
  var outputFile = path.join(options.outputPath, '_index.yaml');
  renderTemplate(template, context, outputFile);
}

function generateTagPages(files, options) {
  gutil.log(' ', 'Generating tag pages...');
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
  var tmpl = path.join(GLOBAL.WF.src.templates, 'updates', 'tag-index.md');
  var outputFile = path.join(options.outputPath, 'index.md');
  renderTemplate(tmpl, context, outputFile);
  tmpl = path.join(GLOBAL.WF.src.templates, 'updates' ,'tag_toc.yaml');
  outputFile = path.join(options.outputPath, '_toc.yaml');
  renderTemplate(tmpl, context, outputFile);
  Object.keys(allTags).forEach(function(key) {
    var opts = {
      title: 'All Updates tagged: ' + key + '',
      section: options.section,
      outputFile: path.join(options.outputPath, key + '.md')
    };
    _generateListPage(allTags[key].articles, opts);
  });
}

exports.generateIndex = generateIndex;
exports.generateFeeds = generateFeeds;
exports.generateListPage = generateListPage;
exports.generateTOCbyMonth = generateTOCbyMonth;
exports.generateTagPages = generateTagPages;
exports.renderTemplate = renderTemplate;
