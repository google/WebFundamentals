/**
 * @fileoverview Helper utility to simplify handlebars template generation
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const marked = require('marked');
const mkdirp = require('mkdirp');
const jsYaml = require('js-yaml');
const gutil = require('gulp-util');
const wfRegEx = require('./wfRegEx');
const wfHelper = require('./wfHelper');
const Handlebars = require('handlebars');
require('handlebars-helpers')();

// eslint-disable-next-line max-len
const ANALYTICS_QS = '?utm_source=feed&amp;utm_medium=feed&amp;utm_campaign=root_feed';

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

/**
 * Renders a template
 *
 * @param {string} templateFile The path to the template.
 * @param {Object} context The data to render into the template.
 * @param {string} outputFile The path to the rendered file.
 */
function renderTemplate(templateFile, context, outputFile) {
  const ts = fs.readFileSync(templateFile, 'utf8');
  const template = Handlebars.compile(ts);
  const result = template(context);
  mkdirp.sync(path.dirname(outputFile));
  fs.writeFileSync(outputFile, result);
}

/**
 * Gets the full article to use in feeds
 *
 * @param {Array} articles List of files to get content.
 * @param {number} maxItems Number of items to include in the feed.
 * @param {boolean=} includeContent Whether to include article body content in
 *     the feed. True by default.
 * @return {Array} list of articles
 */
function getFullFeedEntries(articles, maxItems, includeContent = true) {
  let yamlCont = fs.readFileSync('./src/data/_contributors.yaml', 'utf8');
  let contributors = jsYaml.safeLoad(yamlCont);
  articles = articles.slice(0, maxItems);
  articles.forEach(function(article) {
    let content = fs.readFileSync(article.filePath, 'utf8');
    content = content.replace(/{#.*#}/g, '');
    content = content.replace(/{%.*%}/g, '');
    content = content.replace(wfRegEx.RE_BOOK_PATH, '');
    content = content.replace(wfRegEx.RE_PROJECT_PATH, '');
    content = content.replace(wfRegEx.RE_DESCRIPTION, '');
    content = content.replace(/{:.*}/g, '');
    article.content = marked(content);
    if (!includeContent) {
      article.content = null;
    }
    if (article.authors && article.authors[0]) {
      let author = contributors[article.authors[0]];
      if (author) {
        let authorName = '';
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

/**
 * Generate the RSS & ATOM feeds for a list of files
 *
 * @param {Array} files List of files to generate feed items for
 * @param {Object} options Options used to generate the feed
 */
function generateFeeds(files, options) {
  if (!global.WF.options.buildRSS) {
    return;
  }
  gutil.log(' ', `Generating '${options.title}' RSS & ATOM feeds...`);
  const maxItems = options.maxItems || global.WF.maxArticlesInFeed;
  let context = {
    title: options.title,
    description: options.description,
    articles: getFullFeedEntries(files, maxItems, options.includeContent),
    host: 'https://developers.google.com',
    baseUrl: 'https://developers.google.com/web/',
    analyticsQS: ANALYTICS_QS,
  };
  if (options.baseUrl) {
    context.baseUrl = options.baseUrl;
  }
  if (options.section) {
    context.baseUrl += options.section + '/';
    // eslint-disable-next-line max-len
    context.analyticsQS = ANALYTICS_QS.replace('root_feed', options.section + '_feed');
  }
  // Note - use last updated instead of now to prevent feeds from being
  // generated every single time. This will only generate if the feeds are
  // actually updated.
  context.rssPubDate = wfHelper.dateFormatRSS(files[0].dateUpdatedMoment);
  context.atomPubDate = wfHelper.dateFormatAtom(files[0].dateUpdatedMoment);

  let template = path.join(global.WF.src.templates, 'atom.xml');
  let outputFile = path.join(options.outputPath, 'atom.xml');
  renderTemplate(template, context, outputFile);

  template = path.join(global.WF.src.templates, 'rss.xml');
  outputFile = path.join(options.outputPath, 'rss.xml');
  renderTemplate(template, context, outputFile);
}

/**
 * Generate feeds for a podcast
 *
 * @param {Array} files List of files to generate feed items for
 * @param {Object} options Options used to generate the feed
 */
function generatePodcastFeed(files, options) {
  gutil.log(' ', 'Generating podcast feed for', options.title);
  let context = {
    title: options.title,
    subtitle: options.subtitle,
    summary: options.summary,
    author: options.author,
    image: options.image,
    articles: files,
    host: 'https://developers.google.com',
    baseUrl: 'https://developers.google.com/web/',
  };
  if (options.baseUrl) {
    context.baseUrl = options.baseUrl;
  }
  // Note - use last updated instead of now to prevent feeds from being
  // generated every single time. This will only generate if the feeds are
  // actually updated.
  context.rssPubDate = wfHelper.dateFormatRSS(files[0].dateUpdatedMoment);
  const template = path.join(global.WF.src.templates, 'shows', 'podcast.xml');
  const outputFile = path.join(options.outputPath, 'feed.xml');
  renderTemplate(template, context, outputFile);
}

/**
 * Generate a list page
 * @private
 *
 * @param {Array} files List of files to generate page for
 * @param {Object} options Options used to generate the page
 */
function _generateListPage(files, options) {
  let context = {
    title: options.title,
    section: options.section,
    articles: files,
  };
  let template = path.join(global.WF.src.templates, 'article-list.md');
  if (options.template) {
    template = options.template;
  }
  let outputFile = options.outputFile;
  if (!outputFile) {
    outputFile = path.join(options.outputPath, 'index.md');
  }
  renderTemplate(template, context, outputFile);
}

/**
 * Generate a list page
 *
 * @param {Array} files List of files to generate page for
 * @param {Object} options Options used to generate the page
 */
function generateListPage(files, options) {
  gutil.log(' ', 'Generating article list page for', options.title);
  _generateListPage(files, options);
}

/**
 * Generate a TOC page by month
 *
 * @param {Array} files List of files to generate page for
 * @param {Object} options Options used to generate the page
 */
function generateTOCbyMonth(files, options) {
  gutil.log(' ', 'Generating _toc.yaml for', options.title);
  let context = {
    year: options.year,
    title: options.title,
    section: options.section,
    months: wfHelper.splitByMonth(files).reverse(),
  };
  const template = path.join(global.WF.src.templates, 'toc-month.yaml');
  const outputFile = path.join(options.outputPath, '_toc.yaml');
  renderTemplate(template, context, outputFile);
}

/**
 * Generate an index page
 *
 * @param {Array} files List of files to generate page for
 * @param {Object} options Options used to generate the page
 */
function generateIndex(files, options) {
  gutil.log(' ', 'Generating index page...');
  let context = {
    description: options.description,
    section: options.section,
    articles: files,
  };
  if (options.title) {
    context.title = options.title;
  }
  let template = path.join(global.WF.src.templates, 'index.yaml');
  if (options.template) {
    template = options.template;
  }
  let outputFile = path.join(options.outputPath, '_index.yaml');
  if (options.outputFile) {
    outputFile = options.outputFile;
  }
  renderTemplate(template, context, outputFile);
}

/**
 * Generate the latest updates widget
 *
 * @param {Array} files List of files
 * @param {Object} options Options used to generate the widget
 */
function generateLatestWidget(files, options) {
  gutil.log(' ', 'Generating latest updates widget...');
  // Create a new array instead of mutating the existing array
  const articles = [];
  const len = options.articlesToShow || files.length;
  for (let i = 0; i < len; i++) {
    articles.push(files[i]);
  }
  const context = {articles};
  const template = path.join(global.WF.src.templates, 'latest_articles.html');
  const outputFile = path.join(options.outputPath, '_shared',
      'latest_articles.html');
  renderTemplate(template, context, outputFile);
}

/**
 * Generate the tag pages
 *
 * @param {Array} files List of files
 * @param {Object} options Options used to generate the widget
 */
function generateTagPages(files, options) {
  gutil.log(' ', 'Generating tag pages for ' + options.section + '...');
  let allTags = {};
  files.forEach(function(file) {
    const tags = file.tags;
    tags.forEach(function(tag) {
      tag = tag.toLowerCase();
      if (!allTags[tag]) {
        allTags[tag] = {
          tag: tag,
          articles: [],
        };
      }
      allTags[tag].articles.push(file);
    });
  });
  let context = {
    title: options.title,
    tags: Object.keys(allTags).sort(),
    section: options.section,
  };
  let tmpl = path.join(global.WF.src.templates, 'tags', 'tag-index.md');
  let outputFile = path.join(options.outputPath, 'index.md');
  renderTemplate(tmpl, context, outputFile);
  tmpl = path.join(global.WF.src.templates, 'tags', 'tag_toc.yaml');
  outputFile = path.join(options.outputPath, '_toc.yaml');
  renderTemplate(tmpl, context, outputFile);
  Object.keys(allTags).forEach(function(key) {
    // eslint-disable-next-line max-len
    let name = options.section.replace(/(\w)(\w+[^s])(s|S)?\b/, (_, a, b) => a.toUpperCase() + b + 's');
    const opts = {
      title: 'All ' + name + ' tagged: ' + key + '',
      section: options.section,
      outputFile: path.join(options.outputPath, key + '.md'),
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
