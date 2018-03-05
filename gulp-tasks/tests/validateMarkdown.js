/**
 * @fileoverview Validates a file is a valid YAML file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const path = require('path');
const vfile = require('vfile');
const moment = require('moment');
const remark = require('remark');
const wfRegEx = require('../wfRegEx');
const testHelpers = require('./helpers');
const remarkLint = require('remark-lint');


const MAX_DESCRIPTION_LENGTH = 485;
const RE_SRC_TRANSLATED_PATH = /^src\/content\/(?!en)\w\w(-\w\w)?\/.*/;
const PAGE_TYPES = {
  LANDING: 'landing',
  ARTICLE: 'article',
};
const VALID_DATE_FORMATS = ['YYYY-MM-DD'];
const VALID_REGIONS = [
  'africa', 'asia', 'europe', 'middle-east', 'north-america', 'south-america',
];
const VALID_VERTICALS = [
  'education', 'entertainment', 'media', 'real-estate', 'retail',
  'transportation', 'travel',
];
const REMARK_WARNING_ONLY = [
  'maximum-line-length',
  'code-block-style',
  'heading-style',
];
let remarkLintOptions = {
  external: [
    './gulp-tasks/remark-lint-tests/check-links.js',
    './gulp-tasks/remark-lint-tests/check-headings.js',
    './gulp-tasks/remark-lint-tests/check-html',
    './gulp-tasks/remark-lint-tests/check-images',
  ],

  /* from check-links.js */
  wfLinksDGC: true,
  wfLinksInternal: true,
  wfLinksForcedLang: true,
  wfLinksUnsafeShort: true,
  wfLinksLineBreak: true,

  /* from check-headings.js */
  wfHeadingsTldr: true,
  wfHeadingsBlank: true,
  wfHeadingsInMarkdown: true,
  wfHeadingsAtLeast: 1,
  wfHeadingsNoMarkupInTitle: true,

  /* from check-html.js */
  wfHtmlYouTube: true,
  wfHtmlDgcLinks: true,
  wfHtmlLinkForcedLang: true,
  wfHtmlInternalLinks: true,
  wfHtmlLinkLineBreaks: true,
  wfHtmlUnsafeShortLinks: true,

  /* from check-images.js */
  wfImagesMd: false,
  wfImagesHtml: false,

  /* from remark */
  firstHeadingLevel: 1,
  headingStyle: 'atx',
  maximumHeadingLength: false,
  maximumLineLength: false,
  noDuplicateDefinitions: true,
  noDuplicateHeadingsInSection: false,
  noEmphasisAsHeading: false,
  noEmptyLinkURL: true,
  noMultipleToplevelHeadings: true,
  noUnusedDefinitions: false,
};

/**
 * Simple wrapper for testHelpers.doesFileExist.
 *
 * @param {string} filename The WebFundamentals file path.
 * @return {Boolean} True if it exists, false if not.
 */
function doesFileExist(filename) {
  return testHelpers.doesFileExist(filename);
}

/**
 * Simple wrapper for testHelpers.getLineNumber.
 *
 * @param {string} contents The content of the string to check.
 * @param {Number} idx Where in the string to stop.
 * @return {Number} The line number the index ends on.
 */
function getLineNumber(contents, idx) {
  return testHelpers.getLineNumber(contents, idx);
}


/**
 * Tests a Markdown file
 *
 * @param {string} filename The name of the file to be tested.
 * @param {string} contents The contents of the file to be tested.
 * @param {Object} options The options object
 * @return {Promise} Resolves to true if no errors, else an array of errors.
 */
function test(filename, contents, options) {
  return new Promise(function(resolve, reject) {
    const results = [];

    /**
     * Simple wrapper that adds an error to the list
     *
     * @param {string} message The message to add.
     * @param {object} position The line number the error occured on.
     */
    function logError(message, position) {
      results.push({
        level: 'ERROR',
        filename: filename,
        position: position,
        message: message,
      });
    }

    /**
     * Simple wrapper that adds a warning to the list
     *
     * @param {string} message The message to add.
     * @param {object} position The line number the warning occured on.
     */
    function logWarning(message, position) {
      results.push({
        level: 'WARNING',
        filename: filename,
        position: position,
        message: message,
      });
    }

    const isInclude = wfRegEx.RE_MD_INCLUDE.test(contents);
    const isTranslation = RE_SRC_TRANSLATED_PATH.test(filename);

    let pageType = PAGE_TYPES.ARTICLE;
    if (/page_type: landing/.test(contents)) {
      pageType = PAGE_TYPES.LANDING;
    }

    // Verify there are no dots in the filename
    let numDots = filename.split('.');
    if (numDots.length !== 2) {
      logError('Filename or path should not contain dots.');
    }

    // Verify extension on file is .md
    if (path.extname(filename.toLowerCase()) !== '.md') {
      logError(`File extension must be '.md'`);
    }

    // Validate book_path is specified and file exists
    const bookPath = wfRegEx.RE_BOOK_PATH.exec(contents);
    if (!bookPath && !isInclude) {
      logError(`Attribute 'book_path' missing from top of document`);
    }
    if (bookPath && bookPath[1] && !isInclude) {
      if (doesFileExist(bookPath[1]) !== true) {
        logError(`Unable to find specified 'book_path': ${bookPath[1]}`);
      }
    }

    // Validate project_path is specified and file exists
    const projectPath = wfRegEx.RE_PROJECT_PATH.exec(contents);
    if (!projectPath && !isInclude) {
      logError(`Attribute 'project_path' missing from top of document`);
    }
    if (projectPath && projectPath[1] && !isInclude) {
      if (doesFileExist(projectPath[1]) !== true) {
        logError(`Unable to find specified 'project_path': ${projectPath[1]}`);
      }
    }

    // Validate description
    let matches = wfRegEx.RE_DESCRIPTION.exec(contents);
    if (matches) {
      let description = matches[1].trim();
      const position = {line: getLineNumber(contents, matches.index)};
      if (isInclude) {
        const msg = `Included files should not include 'description' tags.`;
        logError(msg, position);
      }
      if (description.length === 0) {
        logError(`Attribute 'description' cannot be empty.`, position);
      } else if (description.length > MAX_DESCRIPTION_LENGTH) {
        const msg = `Attribute 'description' exceeds ` +
          `${MAX_DESCRIPTION_LENGTH} characters, was: ${description.length}`;
        logError(msg, position);
      }
      if (description.indexOf('<') >= 0 || description.indexOf('`') >= 0) {
        const msg = `Attribute 'description' cannot contain HTML or  ` +
          `markdown, found: ${description}`;
        logError(msg, position);
      }
    }

    // Validate wf_updated
    matches = wfRegEx.RE_UPDATED_ON.exec(contents);
    if (!isInclude && !isTranslation) {
      if (!matches) {
        logError(`WF Tag 'wf_updated_on' is missing (YYYY-MM-DD)`);
      } else {
        const position = {line: getLineNumber(contents, matches.index)};
        let d = moment(matches[1], VALID_DATE_FORMATS, true);
        if (d.isValid() === false) {
          const msg = `WF Tag 'wf_updated_on' invalid format (YYYY-MM-DD), ` +
            `found: ${matches[1]}`;
          logError(msg, position);
        } else if (options.lastUpdateMaxDays) {
          const nowMinus = moment().subtract(options.lastUpdateMaxDays, 'days');
          if (d.isBefore(nowMinus)) {
            const msg = `WF Tag 'wf_updated_on' must be within the last ` +
              `${options.lastUpdateMaxDays} days.`;
            logWarning(msg, position);
          }
        }
      }
    }

    // Validate wf_published
    matches = wfRegEx.RE_PUBLISHED_ON.exec(contents);
    if (!isInclude && !isTranslation) {
      if (!matches) {
        logError(`WF Tag 'wf_published_on' is missing (YYYY-MM-DD)`);
      } else {
        const position = {line: getLineNumber(contents, matches.index)};
        let d = moment(matches[1], VALID_DATE_FORMATS, true);
        if (d.isValid() === false) {
          const msg = `WF Tag 'wf_published_on' invalid format (YYYY-MM-DD), ` +
            `found: ${matches[1]}`;
          logError(msg, position);
        }
      }
    }

    // Validate featured image path
    matches = wfRegEx.RE_IMAGE.exec(contents);
    if (matches) {
      if (doesFileExist(matches[1]) !== true) {
        const position = {line: getLineNumber(contents, matches.index)};
        const msg = `WF Tag 'wf_featured_image' found, but couldn't find ` +
          `image - ${matches[1]}`;
        logError(msg, position);
      }
    }

    // Validate featured square image path
    matches = wfRegEx.RE_IMAGE_SQUARE.exec(contents);
    if (matches) {
      if (doesFileExist(matches[1]) !== true) {
        const position = {line: getLineNumber(contents, matches.index)};
        const msg = `WF Tag 'wf_featured_image_square' found, but couldn't ` +
          `find image - ${matches[1]}`;
        logError(msg, position);
      }
    }

    // Check for uncommon tags
    matches = wfRegEx.RE_TAGS.exec(contents);
    if (matches && options.commonTags) {
      const position = {line: getLineNumber(contents, matches.index)};
      matches[1].split(',').forEach(function(tag) {
        tag = tag.trim();
        if (options.commonTags.indexOf(tag) === -1) {
          logWarning(`Uncommon tag (\`${tag}\`) found.`, position);
        }
      });
    }

    // Check for valid Blink components
    matches = wfRegEx.RE_BLINK_COMPONENTS.exec(contents);
    if (options.blinkComponents && !isInclude && !isTranslation) {
      if (matches) {
        const position = {line: getLineNumber(contents, matches.index)};
        if (matches[1].trim().toUpperCase() !== 'N/A') {
          matches[1].split(',').forEach(function(component) {
            component = component.trim();
            if (options.blinkComponents.indexOf(component) === -1) {
              const msg = `Unknown 'wf_blink_component' (${component}), see ` +
                `https://goo.gl/VXmg9e`;
              logError(msg, position);
            }
          });
        }
      } else {
        logError(`No 'wf_blink_components' found, see https://goo.gl/VXmg9e`);
      }
    }

    // Check for valid regions
    matches = wfRegEx.RE_REGION.exec(contents);
    if (matches) {
      let region = matches[1];
      if (VALID_REGIONS.indexOf(region) === -1) {
        const position = {line: getLineNumber(contents, matches.index)};
        logError(`Invalid 'wf_region' (${region}) provided.`, position);
      }
    }

    // Check for valid verticals
    matches = wfRegEx.RE_VERTICAL.exec(contents);
    if (matches) {
      let vertical = matches[1];
      if (VALID_VERTICALS.indexOf(vertical) === -1) {
        const position = {line: getLineNumber(contents, matches.index)};
        logError(`Invalid 'wf_vertical' (${vertical}) provided.`, position);
      }
    }

    // Check for a single level 1 heading with page title
    matches = wfRegEx.RE_TITLE.exec(contents);
    if (pageType === PAGE_TYPES.ARTICLE && !matches && !isInclude) {
      logError(`Page is missing page title eg: '# TITLE {: .page-title }'`);
    }
    if (matches && isInclude) {
      const position = {line: getLineNumber(matches.index)};
      logError(`Include file should not contain a page title!`, position);
    }

    // Check for only a single instance of the {: .page-title } class
    matches = wfRegEx.getMatches(wfRegEx.RE_TITLE_CLASS, contents);
    let maxMatches = 1;
    let maxMatchMsg = `Must contain ONE title class '{: .page-title }'`;
    if (isInclude) {
      maxMatchMsg = `Includes cannot contain any '{: .page-title }' classes.`;
      maxMatches = 0;
    }
    if (matches.length > maxMatches) {
      matches.forEach(function(match) {
        const position = {line: getLineNumber(contents, match.index)};
        logError(maxMatchMsg, position);
      });
    }

    // Verify authors/translators are in the contributors file
    if (options.contributors) {
      matches = wfRegEx.getMatches(wfRegEx.RE_AUTHOR_LIST, contents);
      matches.forEach(function(match) {
        let key = match[1];
        if (!options.contributors[key]) {
          const position = {line: getLineNumber(contents, match.index)};
          const msg = `Cannot find contributor (${key}) in contributors file.`;
          logError(msg, position);
        }
      });
    }

    // Verify all includes start with web/
    matches = wfRegEx.getMatches(wfRegEx.RE_INCLUDES, contents);
    matches.forEach(function(include) {
      const position = {line: getLineNumber(contents, include.index)};
      const inclFile = include[2];
      const quoteL = include[1];
      const quoteR = include[3];
      if (quoteL !== quoteR || quoteL === '') {
        logError(`'{% include %}' is badly quoted: ${include[0]}`, position);
      }
      if (inclFile === 'comment-widget.html') {
        return;
      }
      if (inclFile.indexOf('web/') !== 0) {
        logError(`Include path MUST start with 'web/': ${inclFile}`, position);
      }
      if (doesFileExist(inclFile) !== true) {
        const msg = `'{% include %}' found, but couldn't find related ` +
          `include: ${inclFile}`;
        logError(msg, position);
      }
      if (!inclFile.endsWith('.html') && !inclFile.endsWith('.js')) {
        const msg = `'{% include %}' found, file must be an HTML file: ` +
          `${inclFile}`;
        logError(msg, position);
      }
    });

    // Verify all {% includecode %} elements work properly
    matches = wfRegEx.getMatches(wfRegEx.RE_INCLUDE_CODE, contents);
    matches.forEach((match) => {
      const msg = 'IncludeCode widget -';
      const widget = match[0];
      const position = {line: getLineNumber(contents, match.index)};
      const inclFile = wfRegEx.getMatch(wfRegEx.RE_INCLUDE_CODE_PATH, widget);
      if (inclFile) {
        if (inclFile.indexOf('web/') !== 0) {
          logError(`${msg} path must start with 'web/'`, position);
        }
        if (doesFileExist(inclFile) !== true) {
          logError(`${msg} file not found: '${inclFile}'`, position);
        }
      }

      const githubFile = wfRegEx.getMatch(
          wfRegEx.RE_INCLUDE_CODE_GITHUB_PATH, widget);
      if (githubFile && githubFile.includes('web/')) {
        // @todo: not a valid test
        // logError(
        //   `${msg} github_path must reference a file on github`, position);
      }
    });

    // Verify all <<include.md>> markdown files are accessible
    matches = wfRegEx.getMatches(wfRegEx.RE_INCLUDE_MD, contents);
    matches.forEach(function(match) {
      let inclFile = path.resolve(path.parse(filename).dir, match[1]);
      if (doesFileExist(inclFile)) {
        return;
      }
      const position = {line: getLineNumber(contents, match.index)};
      const msg = `Markdown include ${match[0]} found, but couldn't find file.`;
      logError(msg, position);
    });

    // Error on single line comments
    matches = wfRegEx.getMatches(wfRegEx.RE_SINGLE_LINE_COMMENT, contents);
    matches.forEach(function(match) {
      const position = {line: getLineNumber(contents, match.index)};
      const msg = `Multi-line comment syntax used on single line comment. ` +
        `Use single line syntax: '{# this is my comment #}'`;
      logError(msg, position);
    });

    // Warn on unescaped template tags
    matches = wfRegEx.getMatches(/\{\{/g, contents);
    matches.forEach(function(match) {
      const position = {line: getLineNumber(contents, match.index)};
      const msg = `Template tags ('{{'') should be escaped to '&#123;&#123;'`;
      logError(msg, position);
    });

    // Error on bad anchor tags
    matches = wfRegEx.getMatches(/{#\w+}/gm, contents);
    matches.forEach(function(match) {
      const position = {line: getLineNumber(contents, match.index)};
      const msg = `Unsupported anchor style used, use '{: #anchor }', found: `;
        `'${match[0]}'`;
      logError(msg, position);
    });

    // Error on script blocks in markdown
    if (!options.ignoreScriptTags) {
      matches = wfRegEx.getMatches(/<script/gm, contents);
      matches.forEach(function(match) {
        const position = {line: getLineNumber(contents, match.index)};
        const msg = `'<script> tags are generally not allowed, ` +
          `please double check.`;
        logWarning(msg, position);
      });
    }

    // Warn on missing comment widgets
    if (!options.ignoreMissingCommentWidget) {
      const reComment = /^{%\s?include "comment-widget\.html"\s?%}/m;
      const reUpdatesPath = /src\/content\/.+?\/updates\/\d{4}\//;
      if (reUpdatesPath.test(filename)) {
        if (!reComment.test(contents)) {
          const position = {line: getLineNumber(contents, contents.length - 1)};
          const msg = `Updates post is missing comment widget: ` +
            `'{% include "comment-widget.html" %}'`;
          logWarning(msg, position);
        }
      }
    }

    // Warn on missing comment widgets
    if (!options.ignoreMissingFeedWidget) {
      const reWidget =
          /^{%\s?include "web\/_shared\/rss-widget-updates.html"\s?%}/m;
      const reUpdatesPath = /src\/content\/.+?\/updates\/\d{4}\//;
      if (reUpdatesPath.test(filename)) {
        if (!reWidget.test(contents)) {
          const position = {line: getLineNumber(contents, contents.length - 1)};
          const msg = `Updates post is missing RSS feed widget: ` +
            `'{% include "web/_shared/rss-widget-updates.html" %}'`;
          logWarning(msg, position);
        }
      }
    }

    remarkLintOptions.firstHeadingLevel = 1;
    remarkLintOptions.wfHeadingsAtLeast = 1;
    if (isInclude || pageType === PAGE_TYPES.LANDING) {
      remarkLintOptions.firstHeadingLevel = false;
      remarkLintOptions.wfHeadingsAtLeast = 2;
    }
    remarkLintOptions.maximumLineLength = false;
    if (options.enforceLineLengths && !isTranslation) {
      remarkLintOptions.maximumLineLength = 100;
      contents = contents.replace(wfRegEx.RE_DESCRIPTION, '\n');
      contents = contents.replace(wfRegEx.RE_SNIPPET, '\n\n');
      contents = contents.replace(wfRegEx.RE_TAGS, '\n\n');
      contents = contents.replace(wfRegEx.RE_IMAGE, '\n\n');
    }

    // Use remark to lint the markdown
    let vFile = vfile({path: filename, extname: '.md', contents: contents});
    remark()
    .use(remarkLint, remarkLintOptions)
    .process(vFile, function(err, vFileResult) {
      if (err) {
        logError(`Critical linting error: ${err.message}`);
      }
      if (vFileResult) {
        vFileResult.messages.forEach(function(vMsg) {
          let position = {
            line: vMsg.line,
            column: vMsg.column,
          };
          if (REMARK_WARNING_ONLY.indexOf(vMsg.ruleId) >= 0) {
            logWarning(vMsg.message, position);
          } else {
            logError(vMsg.message, position);
          }
        });
      }

      if (results.length > 0) {
        reject(results);
        return;
      }
      resolve(true);
    });
  });
}

exports.test = test;
