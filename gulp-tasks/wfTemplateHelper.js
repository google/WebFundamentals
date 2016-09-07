'use strict';

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var jsYaml = require('js-yaml');
var marked = require('marked');
var gutil = require('gulp-util');
var Handlebars = require('handlebars');
require('handlebars-helpers')();

function renderTemplate(templateFile, context, outputFile) {
  var ts = fs.readFileSync(templateFile, 'utf8');
  var template = Handlebars.compile(ts);
  var result = template(context);
  fs.writeFileSync(outputFile, result);
}

function generateIndex(files, options) {
  gutil.log(' ', 'Generating index file...');
  var context = {
    description: options.description,
    section: options.sectionId,
    articles: files,
  };
  var template = path.join(GLOBAL.WF.src.templates, options.sectionId, '_index.yaml');
  var outputFile = path.join(GLOBAL.WF.src.content, options.sectionId, '_index.yaml');
  renderTemplate(template, context, outputFile);
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
  var rssPubDate = moment(lastUpdated).format('MM MMM YYYY HH:mm:ss [GMT]');
  var atomPubDate = moment(lastUpdated).format('YYYY-MM-DDTHH:mm:ss[Z]');
  var context = {
    title: options.title,
    section: options.sectionId,
    description: options.description,
    rssPubDate: rssPubDate,
    atomPubDate: atomPubDate,
    articles: getFullFeedEntries(files)
  };

  var atomTemplate = path.join(GLOBAL.WF.src.templates, 'atom.xml');
  var atomOutputFile = path.join(GLOBAL.WF.src.content, options.sectionId, 'atom.xml');
  renderTemplate(atomTemplate, context, atomOutputFile);

  var rssTemplate = path.join(GLOBAL.WF.src.templates, 'rss.xml');
  var rssOutputFile = path.join(GLOBAL.WF.src.content, options.sectionId, 'rss.xml');
  renderTemplate(rssTemplate, context, rssOutputFile);
}

function generateListPage(files, options) {
  gutil.log(' ', 'Generating listing page for', options.title);
  var context = {
    title: options.title,
    section: options.sectionId,
    articles: files
  };
  var template = path.join(GLOBAL.WF.src.templates, options.sectionId, 'list-page.md');
  var outputFile = path.join(GLOBAL.WF.src.content, options.sectionId, options.outputFile);
  renderTemplate(template, context, outputFile);
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

function generateTOCbyMonth(files, options) {
  gutil.log(' ', 'Generating TOC for', options.title);
  var context = {
    title: options.title,
    section: options.sectionId,
    months: splitArticlesByMonth(files).reverse()
  };
  var template = path.join(GLOBAL.WF.src.templates, options.sectionId, '_toc.yaml');
  var outputFile = path.join(GLOBAL.WF.src.content, options.sectionId, options.outputFile);
  renderTemplate(template, context, outputFile);
}

function generateTagPages(files, options) {
  gutil.log(' ', 'Generating tag pages');
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
    section: options.sectionId
  };
  var template = path.join(GLOBAL.WF.src.templates, options.sectionId, 'tag-index.md');
  var outputFile = path.join(GLOBAL.WF.src.content, options.sectionId, 'tags/index.md');
  var templateList = path.join(GLOBAL.WF.src.templates, options.sectionId, 'tag-list.md');
  renderTemplate(template, context, outputFile);
  Object.keys(allTags).forEach(function(key) {
    var context = {
      title: allTags[key].tag,
      section: options.sectionId,
      articles: allTags[key].articles
    };
    var outputFile = path.join(GLOBAL.WF.src.content, options.sectionId, 'tags/' + key + '.md');
    renderTemplate(templateList, context, outputFile);
  });
}

exports.generateIndex = generateIndex;
exports.generateFeeds = generateFeeds;
exports.generateListPage = generateListPage;
exports.generateTOCbyMonth = generateTOCbyMonth;
exports.generateTagPages = generateTagPages;
