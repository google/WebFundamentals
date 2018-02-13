/**
 * @fileoverview Gulp Task for testing/validating source files.
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const chalk = require('chalk');
const vfile = require('vfile');
const glob = require('globule');
const moment = require('moment');
const remark = require('remark');
const jsYaml = require('js-yaml');
const gutil = require('gulp-util');
const GitHubApi = require('github');
const wfRegEx = require('./wfRegEx');
const wfHelper = require('./wfHelper');
const remarkLint = require('remark-lint');

const testHelpers = require('./tests/helpers');
const testProject = require('./tests/projectYaml');
const testRedirects = require('./tests/redirectsYaml');
const testGlossary = require('./tests/glossaryYaml');
const testContributors = require('./tests/contributorsYaml');
const testCommonTags = require('./tests/commonTagsJson');
const lintJavaScript = require('./tests/lintJavaScript');
const validateYaml = require('./tests/validateYaml');
const validateJson = require('./tests/validateJson');
const validateJavaScript = require('./tests/validateJavaScript');
const validateHtml = require('./tests/validateHtml');
const validateMedia = require('./tests/validateMedia');
const validateGeneric = require('./tests/validateGeneric');
const validateFilename = require('./tests/validateFilename');

/** ***************************************************************************
 * Constants & Remark Lint Options
 *****************************************************************************/

const MAX_DESCRIPTION_LENGTH = 485;
const MAX_FILES_CHANGED_WARNING = 500; // Max # of files changed before warning
const MAX_FILES_CHANGED_ERROR = 1000; // Max # of files changed before error
const MD_FILES = ['.md', '.mdown', '.markdown'];
const EXTENSIONS_TO_SKIP = ['.css', '.vtt', '.xml', '.txt'];
const MEDIA_FILES = [
  '.gif', '.ico', '.jpg', '.png', '.psd', '.svg',
  '.mov', '.mp3', '.mp4', '.webm',
  '.pdf',
];
const VALID_DATE_FORMATS = [
  'YYYY-MM-DD',
];
const REMARK_WARNING_ONLY = [
  'maximum-line-length',
  'code-block-style',
  'heading-style',
];
const RE_BOM = /^\uFEFF/;
const RE_SRC_BASE = /src\/content\//;
const RE_SRC_TRANSLATED_PATH = /^src\/content\/(?!en)\w\w(-\w\w)?\/.*/;
const RE_DATA_BASE = /src\/data\//;
const RE_GULP_BASE = /^gulp-tasks\/?/;
const ESLINT_RC_FILE = '.eslintrc';
const COMMON_TAGS_FILE = 'src/data/commonTags.json';
const CONTRIBUTORS_FILE = 'src/data/_contributors.yaml';
const BLINK_COMPONENTS_FILE = 'src/data/blinkComponents.json';
const VALID_REGIONS = [
  'africa', 'asia', 'europe', 'middle-east', 'north-america', 'south-america',
];
const VALID_VERTICALS = [
  'education', 'entertainment', 'media', 'real-estate', 'retail',
  'transportation', 'travel',
];
const PAGE_TYPES = {
  LANDING: 'landing',
  ARTICLE: 'article',
};
const IS_TRAVIS = process.env.TRAVIS === 'true';
const IS_TRAVIS_PUSH = process.env.TRAVIS_EVENT_TYPE === 'push';
const IS_TRAVIS_ON_MASTER = process.env.TRAVIS_BRANCH === 'master';

let esLintConfig;
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

/** ***************************************************************************
 * Results
 *****************************************************************************/

let filesTested = 0;
let allErrors = [];
let allWarnings = [];
let filesWithIssues = {};

/** ***************************************************************************
 * Logging Functions
 *****************************************************************************/

/**
 * Logs a message to the console
 *
 * @param {string} level ERROR or WARNING, the level of the error
 * @param {string} filename The file the issue occurred in
 * @param {Object} position The line/column the error occurred on
 * @param {string} message The message to be displayed
 * @param {Object} extra Any extra information to show
 */
function logMessage(level, filename, position, message, extra) {
  let logMsg = {
    filename: filename,
    position: position,
    message: message,
    extra: extra,
  };
  let fileLoc = chalk.cyan(filename);
  level = level.toUpperCase();
  if (position && position.line) {
    fileLoc += chalk.gray('#') + chalk.cyan(position.line);
  }
  if (level === 'ERROR') {
    gutil.log(chalk.red('ERROR:'), fileLoc, message);
    allErrors.push(logMsg);
  } else {
    gutil.log(chalk.yellow('WARNING:'), fileLoc, message);
    allWarnings.push(logMsg);
  }
  if (global.WF.options.verbose && extra) {
    // eslint-disable-next-line no-console
    console.log(extra);
  }
  filesWithIssues[filename] = true;
}

/**
 * Logs an ERROR message to the console
 *
 * @param {string} filename The file the issue occurred in
 * @param {Object} position The line/column the error occurred on
 * @param {string} message The message to be displayed
 * @param {Object} extra Any extra information to show
 */
function logError(filename, position, message, extra) {
  if (global.WF.options.testWarnOnly) {
    logWarning(filename, position, message, extra);
    return;
  }
  logMessage('ERROR', filename, position, message, extra);
}

/**
 * Logs a WARNING message to the console
 *
 * @param {string} filename The file the issue occurred in
 * @param {Object} position The line/column the error occurred on
 * @param {string} message The message to be displayed
 * @param {Object} extra Any extra information to show
 */
function logWarning(filename, position, message, extra) {
  logMessage('WARNING', filename, position, message, extra);
}

/**
 * Prints a summary of the test results
 */
function printSummary() {
  const cFilesWithIssues = Object.keys(filesWithIssues).length;
  gutil.log('');
  gutil.log('Test Completed.');
  gutil.log('Files tested:  ', chalk.cyan(filesTested));
  gutil.log(' - with issues:', chalk.yellow(cFilesWithIssues));
  gutil.log('Errors  : ', chalk.red(allErrors.length));
  gutil.log('Warnings: ', chalk.yellow(allWarnings.length));
  if (IS_TRAVIS) {
    let result = {
      summary: {
        filesTested: filesTested,
        filesWithIssues: cFilesWithIssues,
      },
      errors: allErrors,
      warnings: allWarnings,
    };
    result = JSON.stringify(result, null, 2);
    fs.writeFileSync('./test-results.json', result, 'utf8');
  }
}

/**
 * Throws an exception if there are any test failures.
 */
function throwIfFailed() {
  if (allErrors.length >= 1 && !global.WF.options.testWarnOnly) {
    let errorMessage = `There were ${allErrors.length} errors.`;
    throw new Error(errorMessage);
  }
}

/** ***************************************************************************
 * Helper Functions
 *****************************************************************************/

/**
 * Gets the line number of the current string up to the index point
 *
 * @todo Remove once testMarkdown is gone
 *
 * @param {string} content The content of the string to check
 * @param {Number} idx Where in the string to stop
 * @return {Number} The line number the index ends on
 */
function getLineNumber(content, idx) {
  return testHelpers.getLineNumber(content, idx);
}

/**
 * Reads a file from the file system.
 *
 * @param {string} filename The file to read.
 * @return {string} The contents of the file, or NULL if it failed to read.
 */
function readFile(filename) {
  try {
    let contents = fs.readFileSync(filename, 'utf8');
    // Check if Byte order mark was included
    if (RE_BOM.test(contents)) {
      contents = contents.replace(RE_BOM, '');
      const msg = 'File was saved as UTF-8+BOM, please save without BOM';
      logWarning(filename, null, msg);
    }
    return contents;
  } catch (ex) {
    logWarning(filename, null, 'Unable to read file, was it deleted?', ex);
    return null;
  }
}

/**
 * Checks if a file exists.
 *
 * @todo Replace when testMarkdown is gone
 *
 * @param {string} filename The WebFundamentals file path.
 * @return {Boolean} True if it exists, false if not.
 */
function doesFileExist(filename) {
  return testHelpers.doesFileExist(filename);
}

/**
 * Parses a JSON file
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Object} The parsed JSON object
 */
function parseJSON(filename, contents) {
  try {
    return JSON.parse(contents);
  } catch (ex) {
    let msg = `Unable to parse JSON: ${ex.message}`;
    logError(filename, null, msg, ex);
  }
  return null;
}

/**
 * Parses a YAML file
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Object} The parsed YAML object
 */
function parseYAML(filename, contents) {
  try {
    return jsYaml.safeLoad(contents);
  } catch (ex) {
    let msg = 'Unable to parse YAML';
    if (ex.reason) {
      msg = ex.reason;
    }
    let position = ex.mark;
    if (position && position.line) {
      position.line++;
    }
    logError(filename, position, msg, ex);
  }
  return null;
}

/**
 * Gets a list of all files to be tested.
 *
 * @return {Promise} The list of files
 */
function getFiles() {
  gutil.log(' Searching for files...');
  if (global.WF.options.testPath || global.WF.options.testAll) {
    return new Promise(function(resolve, reject) {
      let globs = ['./gulp-tasks/**/*', './gulpfile.js'];
      let opts = {
        prefixBase: true,
        filter: 'isFile',
      };
      if (global.WF.options.testPath) {
        const testPath = global.WF.options.testPath;
        if (global.WF.options.verbose) {
          gutil.log(' ', 'Searching for files in', chalk.cyan(testPath));
        }
        opts.srcBase = global.WF.options.testPath;
        globs.push('**/*');
      } else {
        opts.srcBase = './src/content';
        global.WF.options.lang.forEach(function(lang) {
          const testPath = `${opts.srcBase}/${lang}`;
          if (global.WF.options.verbose) {
            gutil.log(' ', 'Searching for files in', chalk.cyan(testPath));
          }
          globs.push(`${lang}/**/*`);
        });
      }
      globs.push('!en/tools/puppeteer/_src/**/*');
      resolve(glob.find(globs, opts));
    });
  } else {
    gutil.log(' ', 'Searching for changed files');
    let cmd = 'git --no-pager diff --name-only ';
    if (IS_TRAVIS) {
      cmd += '$(git merge-base FETCH_HEAD master) FETCH_HEAD';
    } else {
      cmd += '$(git merge-base origin/master HEAD)';
    }
    return wfHelper.promisedExec(cmd, '.')
    .then(function(results) {
      let files = [];
      let warnForSideEffect = false;
      results.split('\n').forEach(function(filename) {
        if (RE_GULP_BASE.test(filename) || filename === 'gulpfile.js') {
          warnForSideEffect = true;
          files.push(filename);
        } else if (RE_SRC_BASE.test(filename) || RE_DATA_BASE.test(filename) ||
                   filename === 'app.yaml') {
          files.push(filename);
        }
      });
      if (warnForSideEffect === true) {
        const warn = chalk.yellow('WARNING:');
        const msg = `Gulp tasks have changed, be sure to run with ` +
          `${chalk.cyan('--testAll')} or ${chalk.cyan('--testMaster')} ` +
          `to catch any unintended side effects!`;
        gutil.log(warn, msg);
      }
      const warnMsg = `More than ${MAX_FILES_CHANGED_WARNING} files changed.`;
      if (files.length > MAX_FILES_CHANGED_ERROR) {
        const msg = `Maxiumum number of changed files exceeeded.`;
        logError('', null, `${msg} ${warnMsg}`);
      } else if (files.length > MAX_FILES_CHANGED_WARNING) {
        logWarning('', null, `${warnMsg}`);
      }
      return files;
    });
  }
}

/** ***************************************************************************
 * File Tests
 *****************************************************************************/

/**
 * Tests & validates a markdown file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @todo: Move this into separate file as validateMarkdown.js
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @param {Object} options Options used to test the file
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function testMarkdown(filename, contents, options) {
  return new Promise(function(resolve, reject) {
    let msg;
    let matched;
    let position;
    const isInclude = wfRegEx.RE_MD_INCLUDE.test(contents);
    const isTranslation = RE_SRC_TRANSLATED_PATH.test(filename);

    let pageType = PAGE_TYPES.ARTICLE;
    if (/page_type: landing/.test(contents)) {
      pageType = PAGE_TYPES.LANDING;
    }

    // Verify there are no dots in the filename
    let numDots = filename.split('.');
    if (numDots.length !== 2) {
      logError(filename, null, 'Filename or path should not contain dots.');
    }

    // Verify extension on file is .md
    if (path.extname(filename.toLowerCase()) !== '.md') {
      logError(filename, null, 'File extension must be `.md`');
    }

    // Validate book_path is specified and file exists
    const bookPath = wfRegEx.RE_BOOK_PATH.exec(contents);
    if (!bookPath && !isInclude) {
      msg = 'Attribute `book_path` missing from top of document';
      logError(filename, null, msg);
    }
    if (bookPath && bookPath[1] && !isInclude) {
      msg = 'Unable to find specified `book_path`:';
      if (doesFileExist(bookPath[1]) !== true) {
        logError(filename, null, `${msg} ${bookPath[1]}`);
      }
    }

    // Validate project_path is specified and file exists
    const projectPath = wfRegEx.RE_PROJECT_PATH.exec(contents);
    if (!projectPath && !isInclude) {
      msg = 'Attribute `project_path` missing from top of document';
      logError(filename, null, msg);
    }
    if (projectPath && projectPath[1] && !isInclude) {
      msg = 'Unable to find specified `project_path`:';
      if (doesFileExist(projectPath[1]) !== true) {
        logError(filename, null, `${msg} ${projectPath[1]}`);
      }
    }

    // Validate description
    matched = wfRegEx.RE_DESCRIPTION.exec(contents);
    if (matched) {
      let description = matched[1].trim();
      position = {line: getLineNumber(contents, matched.index)};
      if (isInclude) {
        msg = 'Included files should not include `description` tags.';
        logError(filename, position, msg);
      }
      if (description.length === 0) {
        msg = 'Attribute `description` cannot be empty';
        logError(filename, position, msg);
      } else if (description.length > MAX_DESCRIPTION_LENGTH) {
        msg = `Attribute \`description\` exceeds ${MAX_DESCRIPTION_LENGTH}`;
        msg += ` characters, was: ${description.length}`;
        logError(filename, position, msg);
      }
      if (description.indexOf('<') >= 0 || description.indexOf('`') >= 0) {
        msg = 'Attribute `description` cannot contain HTML or markdown, ';
        msg += `found: ${description}`;
        logError(filename, position, msg);
      }
    }

    // Validate wf_updated
    matched = wfRegEx.RE_UPDATED_ON.exec(contents);
    if (!isInclude && !isTranslation) {
      if (!matched) {
        msg = 'WF Tag `wf_updated_on` is missing (YYYY-MM-DD)';
        logError(filename, null, msg);
      } else {
        position = {line: getLineNumber(contents, matched.index)};
        let d = moment(matched[1], VALID_DATE_FORMATS, true);
        if (d.isValid() === false) {
          msg = 'WF Tag `wf_updated_on` invalid format (YYYY-MM-DD)';
          msg += `, found: ${matched[1]}`;
          logError(filename, position, msg);
        } else if (options.lastUpdateMaxDays) {
          const nowMinus = moment().subtract(options.lastUpdateMaxDays, 'days');
          if (d.isBefore(nowMinus)) {
            msg = 'WF Tag `wf_updated_on` must be within the last ';
            msg += options.lastUpdateMaxDays + ' days.';
            logWarning(filename, position, msg);
          }
        }
      }
    }

    // Validate wf_published
    matched = wfRegEx.RE_PUBLISHED_ON.exec(contents);
    if (!isInclude && !isTranslation) {
      if (!matched) {
        msg = 'WF Tag `wf_published_on` is missing (YYYY-MM-DD)';
        logError(filename, null, msg);
      } else {
        position = {line: getLineNumber(contents, matched.index)};
        let d = moment(matched[1], VALID_DATE_FORMATS, true);
        if (d.isValid() === false) {
          msg = 'WF Tag `wf_published_on` invalid format (YYYY-MM-DD)';
          msg += `, found: ${matched[1]}`;
          logError(filename, position, msg);
        }
      }
    }

    // Validate featured image path
    matched = wfRegEx.RE_IMAGE.exec(contents);
    if (matched) {
      if (doesFileExist(matched[1]) !== true) {
        position = {line: getLineNumber(contents, matched.index)};
        msg = 'WF Tag `wf_featured_image` found, but couldn\'t find ';
        msg += `image - ${matched[1]}`;
        logError(filename, position, msg);
      }
    }

    // Validate featured square image path
    matched = wfRegEx.RE_IMAGE_SQUARE.exec(contents);
    if (matched) {
      if (doesFileExist(matched[1]) !== true) {
        position = {line: getLineNumber(contents, matched.index)};
        msg = 'WF Tag `wf_featured_image_square` found, but couldn\'t find ';
        msg += `image - ${matched[1]}`;
        logError(filename, position, msg);
      }
    }

    // Check for uncommon tags
    matched = wfRegEx.RE_TAGS.exec(contents);
    if (matched && options.commonTags) {
      position = {line: getLineNumber(contents, matched.index)};
      matched[1].split(',').forEach(function(tag) {
        tag = tag.trim();
        if (options.commonTags.indexOf(tag) === -1) {
          msg = `Uncommon tag (\`${tag}\`) found.`;
          logWarning(filename, position, msg);
        }
      });
    }

    // Check for valid Blink components
    matched = wfRegEx.RE_BLINK_COMPONENTS.exec(contents);
    if (options.blinkComponents && !isInclude && !isTranslation) {
      if (matched) {
        position = {line: getLineNumber(contents, matched.index)};
        if (matched[1].trim().toUpperCase() !== 'N/A') {
          matched[1].split(',').forEach(function(component) {
            component = component.trim();
            if (options.blinkComponents.indexOf(component) === -1) {
              msg = `Unknown 'wf_blink_component' (${component}), see ` +
                `https://goo.gl/VXmg9e`;
              logError(filename, position, msg);
            }
          });
        }
      } else {
        msg = `No 'wf_blink_components' found, see https://goo.gl/VXmg9e`;
        logError(filename, null, msg);
      }
    }

    // Check for valid regions
    matched = wfRegEx.RE_REGION.exec(contents);
    if (matched) {
      let region = matched[1];
      if (VALID_REGIONS.indexOf(region) === -1) {
        position = {line: getLineNumber(contents, matched.index)};
        msg = 'Invalid `wf_region` (' + region + ') provided.';
        logError(filename, position, msg);
      }
    }

    // Check for valid verticals
    matched = wfRegEx.RE_VERTICAL.exec(contents);
    if (matched) {
      let vertical = matched[1];
      if (VALID_VERTICALS.indexOf(vertical) === -1) {
        position = {line: getLineNumber(contents, matched.index)};
        msg = 'Invalid `wf_vertical` (' + vertical + ') provided.';
        logError(filename, position, msg);
      }
    }

    // Check for a single level 1 heading with page title
    matched = wfRegEx.RE_TITLE.exec(contents);
    if (pageType === PAGE_TYPES.ARTICLE && !matched && !isInclude) {
      msg = 'Page is missing page title eg: `# TITLE {: .page-title }`';
      logError(filename, null, msg);
    }
    if (matched && isInclude) {
      msg = 'Include file should not contain a page title!';
      position = {line: getLineNumber(matched.index)};
      logError(filename, position, msg);
    }

    // Check for only a single instance of the {: .page-title } class
    matched = wfRegEx.getMatches(wfRegEx.RE_TITLE_CLASS, contents);
    msg = 'Page can only contain ONE title class `{: .page-title }`';
    let maxMatches = 1;
    if (isInclude) {
      msg = 'Includes should not contain any `{: .page-title }` classes.';
      maxMatches = 0;
    }
    if (matched.length > maxMatches) {
      matched.forEach(function(match) {
        position = {line: getLineNumber(contents, match.index)};
        logError(filename, position, msg);
      });
    }

    // Verify authors/translators are in the contributors file
    if (options.contributors) {
      matched = wfRegEx.getMatches(wfRegEx.RE_AUTHOR_LIST, contents);
      matched.forEach(function(match) {
        let key = match[1];
        if (!options.contributors[key]) {
          position = {line: getLineNumber(contents, match.index)};
          msg = `Unable to find contributor (\`${key}\`) in contributors file.`;
          logError(filename, position, msg);
        }
      });
    }

    // Verify all includes start with web/
    matched = wfRegEx.getMatches(wfRegEx.RE_INCLUDES, contents);
    matched.forEach(function(include) {
      position = {line: getLineNumber(contents, include.index)};
      const inclFile = include[2];
      const quoteL = include[1];
      const quoteR = include[3];
      if (quoteL !== quoteR || quoteL === '') {
        msg = '`{% include %}` tag is badly quoted';
        logError(filename, position, `${msg}: ${include[0]}`);
      }
      if (inclFile === 'comment-widget.html') {
        return;
      }
      if (inclFile.indexOf('web/') !== 0) {
        msg = `Include path MUST start with \`web/\` - ${inclFile}`;
        logError(filename, position, msg);
      }
      if (doesFileExist(inclFile) !== true) {
        msg = '`{% include %}` tag found, but couldn\'t find related include';
        logError(filename, position, `${msg}: ${inclFile}`);
      }
      if (!inclFile.endsWith('.html') && !inclFile.endsWith('.js')) {
        msg = '`{% include %}` tag found, file must be an HTML file';
        logError(filename, position, `${msg}: ${inclFile}`);
      }
    });

    // Verify all {% includecode %} elements work properly
    matched = wfRegEx.getMatches(wfRegEx.RE_INCLUDE_CODE, contents);
    matched.forEach((match) => {
      const msg = 'IncludeCode widget -';
      const widget = match[0];
      const position = {line: getLineNumber(contents, match.index)};

      const inclFile = wfRegEx.getMatch(wfRegEx.RE_INCLUDE_CODE_PATH, widget);
      if (inclFile) {
        if (inclFile.indexOf('web/') !== 0) {
          logError(filename, position, `${msg} path must start with 'web/'`);
        }
        if (doesFileExist(inclFile) !== true) {
          logError(filename, position, `${msg} file not found: '${inclFile}'`);
        }
      }

      const githubFile = wfRegEx.getMatch(
          wfRegEx.RE_INCLUDE_CODE_GITHUB_PATH, widget);
      if (githubFile && githubFile.includes('web/')) {
        logError(filename, position,
            `${msg} github_path must reference a file on github`);
      }
    });

    // Verify all <<include.md>> markdown files are accessible
    matched = wfRegEx.getMatches(wfRegEx.RE_INCLUDE_MD, contents);
    matched.forEach(function(match) {
      let inclFile = path.resolve(path.parse(filename).dir, match[1]);
      if (doesFileExist(inclFile)) {
        return;
      }
      position = {line: getLineNumber(contents, match.index)};
      msg = `Markdown include ${match[0]} found, but couldn't find file.`;
      logError(filename, position, msg);
    });

    // Error on single line comments
    matched = wfRegEx.getMatches(wfRegEx.RE_SINGLE_LINE_COMMENT, contents);
    matched.forEach(function(match) {
      position = {line: getLineNumber(contents, match.index)};
      msg = 'Multi-line comment syntax used on single line comment.';
      msg += ' Use single line syntax: `{# this is my comment #}`';
      logError(filename, position, msg);
    });

    // Warn on unescaped template tags
    matched = wfRegEx.getMatches(/\{\{/g, contents);
    matched.forEach(function(match) {
      position = {line: getLineNumber(contents, match.index)};
      msg = 'Template tags (`{{`) should be escaped to `&#123;&#123;`';
      logError(filename, position, msg);
    });

    // Error on bad anchor tags
    matched = wfRegEx.getMatches(/{#\w+}/gm, contents);
    matched.forEach(function(match) {
      position = {line: getLineNumber(contents, match.index)};
      msg = 'Unsupported anchor style used, use `{: #anchor }`, found: ';
      msg += `\`${match[0]}\``;
      logError(filename, position, msg);
    });

    // Error on script blocks in markdown
    if (!options.ignoreScriptTags) {
      matched = wfRegEx.getMatches(/<script/gm, contents);
      matched.forEach(function(match) {
        position = {line: getLineNumber(contents, match.index)};
        msg = `'<script> tags are generally not allowed, please double check.`;
        logWarning(filename, position, msg);
      });
    }

    // Warn on missing comment widgets
    if (!options.ignoreMissingCommentWidget) {
      const reComment = /^{%\s?include "comment-widget\.html"\s?%}/m;
      const reUpdatesPath = /src\/content\/.+?\/updates\/\d{4}\//;
      if (reUpdatesPath.test(filename)) {
        if (!reComment.test(contents)) {
          position = {line: getLineNumber(contents, contents.length -1)};
          msg = 'Updates post is missing comment widget: ';
          msg += '`{% include "comment-widget.html" %}`';
          logWarning(filename, position, msg);
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
        msg = `Critical linting error: ${err.message}`;
        logError(filename, null, msg, err);
      }
      if (vFileResult) {
        vFileResult.messages.forEach(function(vMsg) {
          let position = {
            line: vMsg.line,
            column: vMsg.column,
          };
          if (REMARK_WARNING_ONLY.indexOf(vMsg.ruleId) >= 0) {
            logWarning(filename, position, vMsg.message, vMsg);
          } else {
            logError(filename, position, vMsg.message, vMsg);
          }
        });
      }
      resolve(true);
    });
  })
  .catch(function(ex) {
    let msg = `An exception occurred in testMarkdown: ${ex}`;
    logError(filename, null, msg, ex);
    return false;
  });
}


/** ***************************************************************************
 * Primary File Test
 *****************************************************************************/

/**
 * Tests & validates a file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {Object} opts Options for testing the file
 * @return {Promise} A promise that resolves after the tests have completed.
 */
function testFile(filename, opts) {
  const filenameObj = path.parse(filename.toLowerCase());

  // Check if the file is an extension we skip
  if (EXTENSIONS_TO_SKIP.indexOf(filenameObj.ext) >= 0) {
    if (global.WF.options.verbose) {
      const msg = 'Skipped (extension).';
      gutil.log(chalk.gray('SKIP:'), chalk.cyan(filename), msg);
    }
    return Promise.resolve(false);
  }

  // Check media files & verify they're not too big
  if (MEDIA_FILES.indexOf(filenameObj.ext) >= 0) {
    if (opts.ignoreFileSize) {
      return Promise.resolve(false);
    }
    const warnOnly = IS_TRAVIS && IS_TRAVIS_ON_MASTER;
    return validateMedia.test(filename, warnOnly);
  }

  // Attempt to read the file contents
  let contents = readFile(filename);
  if (!contents) {
    return Promise.resolve(false);
  }

  // Check if the file is auto-generated, if it is, ignore it
  if (wfRegEx.RE_AUTO_GENERATED.test(contents)) {
    if (global.WF.options.verbose) {
      const msg = `Skipped (auto-generated).`;
      gutil.log(chalk.gray('SKIP:'), chalk.cyan(filename), msg);
    }
    return Promise.resolve(false);
  }

  // Check the app.yaml file
  if (filenameObj.base === 'app.yaml') {
    logWarning(filename, null, `'app.yaml' was changed, was that intentional?`);
    return validateYaml.test(filename, contents);
  }

  // Check the contributors file
  if (filenameObj.base === '_contributors.yaml') {
    return validateYaml.test(filename, contents)
      .then((parsed) => testContributors.test(filename, parsed));
  }

  // Check the glossary file
  if (filenameObj.base === 'glossary.yaml') {
    return validateYaml.test(filename, contents)
      .then((parsed) => testGlossary.test(filename, parsed));
  }

  // Check the redirects file
  if (filenameObj.base === '_redirects.yaml') {
    return validateYaml.test(filename, contents)
      .then((parsed) => testRedirects.test(filename, parsed));
  }

  // Check the project.yaml file
  if (filenameObj.base === '_project.yaml') {
    return validateYaml.test(filename, contents)
      .then((parsed) => testProject.test(filename, parsed));
  }

  // Check the common tags file
  if (filenameObj.base === 'commontags.json') {
    return validateJson.test(filename, contents)
      .then((parsed) => testCommonTags.test(filename, parsed));
  }

  // Check & validate the Gulp JavaScript files
  if (RE_GULP_BASE.test(filenameObj.dir) ||
      filenameObj.base === 'gulpfile.js') {
    return lintJavaScript.test(filename, esLintConfig, contents);
  }

  // Check markdown files
  if (MD_FILES.indexOf(filenameObj.ext) >= 0) {
    return testMarkdown(filename, contents, opts);
  }

  // Check HTML files
  if (filenameObj.ext === '.html') {
    return validateHtml.test(filename, contents);
  }

  // Check YAML files
  if (filenameObj.ext === '.yaml') {
    return validateYaml.test(filename, contents);
  }

  // Check JSON files
  if (filenameObj.ext === '.json') {
    return validateJson.test(filename, contents);
  }

  // Check JS files
  if (opts.warnOnJavaScript && filenameObj.ext === '.js') {
    return validateJavaScript.test(filename, contents);
  }

  // Check any stray files
  return validateGeneric.test(filename, contents);
}

/**
 * Temporary function to print results from refactored tests
 *
 * @param {Array} results The array of results.
 * @return {Array} results as handed in.
 */
function printTestResults(results) {
  if (!results) {
    return false;
  }
  if (Array.isArray(results) === false) {
    results = [results];
  }
  results.forEach((result) => {
    const filename = result.filename;
    const position = result.position;
    const message = result.message;
    const extra = result.extra;
    if (result.level === 'ERROR') {
      logError(filename, position, message, extra);
    } else {
      logWarning(filename, position, message, extra);
    }
  });
  return true;
}


/** ***************************************************************************
 * Get PR data to potentially ignore any tests
 *****************************************************************************/

gulp.task('test:travis-init', function() {
  // Get the PR number and GitHub Token
  const prNumber = parseInt(process.env.TRAVIS_PULL_REQUEST, 10);
  const gitToken = process.env.GIT_TOKEN;
  // Verify we're on Travis, have a PR# and have the git token
  if (!IS_TRAVIS || !prNumber || !gitToken) {
    gutil.log(' ', 'Not Travis.');
    return Promise.resolve();
  }
  gutil.log(' ', `${chalk.cyan('Travis PR')} - getting title & description.`);
  const prOpts = {
    owner: 'Google',
    repo: 'WebFundamentals',
    number: prNumber,
  };
  // Look up the PR body and check it's contents
  const github = new GitHubApi({debug: false, Promise: Promise});
  github.authenticate({type: 'oauth', token: gitToken});
  return github.pullRequests.get(prOpts).then((prData) => {
    gutil.log('  ', `${prData.title} (${prData.number})`);
    const body = prData.body;
    const ciFlags = wfRegEx.getMatch(/\[WF_IGNORE:(.*)\]/, body, '').split(',');
    if (ciFlags.indexOf('BLINK') >= 0) {
      global.WF.options.ignoreBlink = true;
    }
    if (ciFlags.indexOf('MAX_LEN') >= 0) {
      global.WF.options.ignoreMaxLen = true;
    }
    if (ciFlags.indexOf('SCRIPT') >= 0) {
      global.WF.options.ignoreScript = true;
    }
    if (ciFlags.indexOf('FILE_SIZE') >= 0) {
      global.WF.options.ignoreFileSize = true;
    }
    if (ciFlags.indexOf('NO_ESLINT') >= 0) {
      global.WF.options.ignoreESLint = true;
    }
    if (ciFlags.indexOf('LAST_UPDATED') >= 0) {
      global.WF.options.ignoreLastUpdated = true;
    }
  });
});

/** ***************************************************************************
 * Gulp Test Task
 *****************************************************************************/

gulp.task('test', ['test:travis-init'], function() {
  if (global.WF.options.help) {
    gutil.log(' ', chalk.cyan('--help'), 'Shows this message');
    gutil.log(' ', chalk.cyan('--testAll'), 'Tests all files');
    gutil.log(' ', chalk.cyan('--testMaster'), 'Tests all files like Travis');
    gutil.log(' ', chalk.cyan('--testTests'), 'Tests the test files');
    gutil.log(' ', chalk.cyan('--ignoreESLint'), 'Skips ESLinting');
    gutil.log(' ', chalk.cyan('--ignoreBlink'), 'Skips wf_blink_components');
    gutil.log(' ', chalk.cyan('--ignoreMaxLen'), 'Skips line length checks');
    gutil.log(' ', chalk.cyan('--ignoreScript'), 'Skips <script> checks');
    gutil.log(' ', chalk.cyan('--ignoreFileSize'), 'Skips file size checks');
    gutil.log(' ', chalk.cyan('--ignoreLastUpdated'), 'Skips wf_updated_on');
    gutil.log(' ', chalk.cyan('--ignoreCommentWidget'), 'Skips comment widget');
  }

  if ((global.WF.options.testMaster) ||
      (IS_TRAVIS && IS_TRAVIS_PUSH && IS_TRAVIS_ON_MASTER)) {
    global.WF.options.testAll = true;
    global.WF.options.ignoreBlink = true;
    global.WF.options.ignoreMaxLen = true;
    global.WF.options.ignoreScript = true;
    global.WF.options.ignoreFileSize = true;
    global.WF.options.ignoreLastUpdated = true;
    global.WF.options.ignoreCommentWidget = true;
  }

  let opts = {
    enforceLineLengths: true,
    lastUpdateMaxDays: 7,
    warnOnJavaScript: true,
    commonTags: parseJSON(COMMON_TAGS_FILE, readFile(COMMON_TAGS_FILE)),
    contributors: parseYAML(CONTRIBUTORS_FILE, readFile(CONTRIBUTORS_FILE)),
  };

  // Test all files
  if (global.WF.options.testAll) {
    let msg = `${chalk.cyan('--testAll')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
  }

  // Test the test files
  if (global.WF.options.testTests) {
    global.WF.options.testPath = './src/tests';
    opts.lastUpdateMaxDays = false;
  }

  // Supress ESLinter
  if (global.WF.options.ignoreESLint) {
    let msg = `${chalk.cyan('--ignoreESLint')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
  } else {
    esLintConfig = parseJSON(ESLINT_RC_FILE, readFile(ESLINT_RC_FILE));
  }

  // Supress wf_blink_components warnings
  if (global.WF.options.ignoreBlink) {
    let msg = `${chalk.cyan('--ignoreBlink')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
  } else {
    opts.blinkComponents = parseJSON(BLINK_COMPONENTS_FILE,
        readFile(BLINK_COMPONENTS_FILE));
  }

  // Supress max line length warnings
  if (global.WF.options.ignoreMaxLen) {
    let msg = `${chalk.cyan('--ignoreMaxLen')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.enforceLineLengths = false;
  }

  // Supress markdown script warnings
  if (global.WF.options.ignoreScript) {
    let msg = `${chalk.cyan('--ignoreScript')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.ignoreScriptTags = true;
  }

  // Supress file size warnings
  if (global.WF.options.ignoreFileSize) {
    let msg = `${chalk.cyan('--ignoreFileSize')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.ignoreFileSize = true;
  }

  // Supress missing comment widget warnings
  if (global.WF.options.ignoreCommentWidget) {
    let msg = `${chalk.cyan('--ignoreCommentWidget')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.ignoreMissingCommentWidget = true;
  }

  // Supress last updated warnings
  if (global.WF.options.ignoreLastUpdated) {
    let msg = `${chalk.cyan('--ignoreLastUpdated')} was used.`;
    gutil.log(chalk.bold.blue(' Option:'), msg);
    opts.lastUpdateMaxDays = false;
  }

  return getFiles()
    .then(function(files) {
      gutil.log(chalk.green('Testing'), 'files...');
      return Promise.all(files.map(function(filename) {
        if (global.WF.options.verbose) {
          gutil.log('TESTING:', chalk.cyan(filename));
        }
        if (!validateFilename.test(filename)) {
          logError(filename, null, `File contains illegal characters.`);
        }
        return testFile(filename, opts)
          .catch(printTestResults)
          .then((wasTested) => {
            if (wasTested) {
              filesTested++;
            }
          });
      }));
    })
    .catch(function(ex) {
      let msg = `A critical gulp task exception occurred: ${ex.message}`;
      logError('gulp-tasks/test.js', null, msg, ex);
    })
    .then(printSummary)
    .then(throwIfFailed);
});
