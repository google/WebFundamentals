/**
 * @fileoverview Validates the contents of an HTML or Markdown file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const wfRegEx = require('../wfRegEx');
const testHelpers = require('./helpers');
const commonTypos = require('./commonTypos');

const VALID_REGIONS = [
  'africa', 'asia', 'europe', 'middle-east', 'north-america', 'south-america',
];
const VALID_VERTICALS = [
  'education', 'entertainment', 'media', 'real-estate', 'retail',
  'transportation', 'travel',
];

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
 * Simple wrapper for testHelpers.doesFileExist.
 *
 * @param {string} filename The WebFundamentals file path.
 * @return {Boolean} True if it exists, false if not.
 */
function doesFileExist(filename) {
  return testHelpers.doesFileExist(filename);
}

/**
 * Tests & validates the contents of an HTML or Markdown file.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @param {Object} options The options object
 * @return {Array} An array of warnings and errors found in the file
 */
function test(filename, contents, options) {
  let matches;
  const results = [];

  const isLighthouse = wfRegEx.RE_LIGHTHOUSE_PATH.test(filename);
  const isWorkbox = wfRegEx.RE_WORKBOX_PATH.test(filename);
  const isTranslation = testHelpers.isTranslation(filename, contents);
  const isInclude = testHelpers.isInclude(filename, contents);

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
        const msg = `Unknown tag '${tag}' found, use an existing tag, or add ` +
          `it to 'src/data/commonTags.json'.`;
        logWarning(msg, position);
      }
    });
  }

  // Check for valid Blink components
  if (options.blinkComponents &&
      !isInclude && !isTranslation && !isLighthouse && !isWorkbox) {
    matches = wfRegEx.RE_BLINK_COMPONENTS.exec(contents);
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

  // Error on single line comments
  matches = wfRegEx.getMatches(wfRegEx.RE_SINGLE_LINE_COMMENT, contents);
  matches.forEach(function(match) {
    const position = {line: getLineNumber(contents, match.index)};
    const msg = `Multi-line comment syntax used on single line comment. ` +
      `Use single line syntax: '{# this is my comment #}'`;
    logError(msg, position);
  });

  // Warn on unescaped template tags
  if (!wfRegEx.RE_USES_TEMPLATE.test(contents)) {
    matches = wfRegEx.getMatches(/\{\{/g, contents);
    matches.forEach(function(match) {
      const position = {line: getLineNumber(contents, match.index)};
      const msg = `Template tags ('{{'') should be escaped to '&#123;&#123;'`;
      logError(msg, position);
    });
  }

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

  // Check for common typos
  const typos = commonTypos.test(filename, contents, options);

  return results.concat(typos);
}

exports.test = test;
