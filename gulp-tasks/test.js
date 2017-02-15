/**
 * @fileoverview Gulp Task for staging and publishing /web from a Git repo.
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
const wfRegEx = require('./wfRegEx');
const remarkLint = require('remark-lint');
const runSequence = require('run-sequence');

const STD_EXCLUDES = [
  '!**/_common-links.md',
  '!**/updates/tags/*',
  '!**/showcase/tags/*',
  '!**/fundamentals/getting-started/codelabs/*/*.md',
  '!**/updates/201?/index.md',
  '!**/showcase/201?/index.md',
  '!**/shows/http203/podcast/index.md'
];
const ENFORCE_LINE_LENGHT_AFTER = moment('2017-01-01');
const TEST_LOG_FILE = './test-results.json';
const MD_EXTENSTIONS = ['md', 'markdown', 'mdown'];
const VALID_DATE_FORMATS = ['YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ss.sssZ'];
const MAX_DESCRIPTION_LENGTH = 485;

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

  /* from check-headings.js */
  wfHeadingsTldr: true,
  wfHeadingsBlank: true,
  wfHeadingsInMarkdown: true,
  wfHeadingsNoMarkupInTitle: true,

  /* from check-html.js */
  wfHtmlYouTube: true,
  wfHtmlDgcLinks: true,
  wfHtmlLinkForcedLang: true,
  wfHtmlInternalLinks: true,
  wfHtmlUnsafeShortLinks: true,

  /* from check-images.js */
  wfImagesMd: false,
  wfImagesHtml: false,

  /* from remark */
  codeBlockStyle: 'indented',
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

let fileCount = 0;
let allErrors = [];
let allWarnings = [];
let filesWithIssues = {};

/**
 * Logs a message to the console
 *
 * @param {string} level ERROR or WARNING, the level of the error
 * @param {string} filename The file the issue occured in
 * @param {Object} position The line/column the error occured on
 * @param {string} message The message to be displayed
 * @param {Object} extra Any extra information to show
 */
function logMessage(level, filename, position, message, extra) {
  let logMsg = {
    filename: filename,
    position: position,
    message: message,
    extra: extra
  }
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
  filesWithIssues[filename] = true; 
}

/**
 * Logs an ERROR message to the console
 *
 * @param {string} filename The file the issue occured in
 * @param {Object} position The line/column the error occured on
 * @param {string} message The message to be displayed
 * @param {Object} extra Any extra information to show
 */
function logError(filename, position, message, extra) {
  logMessage('ERROR', filename, position, message, extra);
}

/**
 * Logs a WARNING message to the console
 *
 * @param {string} filename The file the issue occured in
 * @param {Object} position The line/column the error occured on
 * @param {string} message The message to be displayed
 * @param {Object} extra Any extra information to show
 */
function logWarning(filename, position, message, extra) {
  logMessage('WARNING', filename, position, message, extra);
}

/**
 * Gets a list of all files with that extension for the languages
 * specified in the options or the test root.
 *
 * @param {Array} extensions An array of extensions to search for
 * @param {Array} excludes An array of files to exclude from the search
 * @return {Array} A list of files matching the patterns
 */
function getFilelist(extensions, excludes) {
  if (Array.isArray(extensions) === false) {
    extensions = [extensions];
  }
  var opts = {prefixBase: true};
  var globs = [];
  if (GLOBAL.WF.options.testPath) {
    opts.srcBase = GLOBAL.WF.options.testPath;
    extensions.forEach(function(ext) {
      globs.push('**/*.' + ext);
    });
  } else {
    opts.srcBase = './src/content';
    GLOBAL.WF.options.lang.forEach(function(lang) {
      extensions.forEach(function(ext) {
        globs.push('**/*.' + ext);
      });
    });    
  }
  if (!excludes) {
    excludes = STD_EXCLUDES;
  }
  return glob.find(globs, excludes, opts);
}

/**
 * Gets the line number of the current string up to the index point
 * 
 * @param {string} content The content of the string to check
 * @param {Number} idx Where in the string to stop
 * @return {Number} The line number the index ends on
 */
function getLineNumber(content, idx) {
  var subStr = content.substring(0, idx);
  var lineNum = subStr.split(/\r\n|\r|\n/).length;
  return lineNum;
}

/**
 * Reads a file from the file system
 *
 * @param {string} file The file to read
 * @return {Promise} A promise with the file contents
 */
function readFile(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        logError(file, null, 'Unable to read file.', err);
        reject();
      }
      resolve(data);
    });
  });
}

/**
 * Reads a file and parses it from YAML into JSON
 *
 * @param {string} file The file to read and parse into JSON
 * @return {Promise} The JSON object that the file has been parsed into
 */
function parseYaml(file) {
  return new Promise(function(resolve, reject) {
    readFile(file)
    .then(function(contents) {
      try {
        let parsed = jsYaml.safeLoad(contents);
        resolve(parsed);
      } catch (ex) {
        let msg = 'Unable to parse YAML';
        if (ex.reason) {
          msg = ex.reason;
        }
        let position = null;
        if (ex.mark && ex.mark.line) {
          position = {
            line: ex.mark.line + 1
          };
        }
        if (position && ex.mark && ex.mark.column) {
          position.column = ex.mark.column;
        }
        logError(file, position, msg, ex);
        resolve(null);
      }
    })
  });
}

/**
 * Lints and validates the Markdown File against a set of rules
 *
 * @param {string} file The file to read and validate
 * @param {Array} commonTags An array of commonly used tags
 * @param {Object} contributors A collection of all contributors
 * @return {Promise} The JSON object that the file has been parsed into
 */
function validateMDFile(file, commonTags, contributors) {
  return new Promise(function(resolve, reject) {

    let errMsg;
    let matched;
    let position;
    let enforceLineLength = false;
    let content = fs.readFileSync(file, 'utf8');
    let metadata = {};
    metadata.include = wfRegEx.RE_MD_INCLUDE.test(content);

    // Verify there are no dots in the filename
    let numDots = file.split('.');
    if (numDots.length !== 2) {
      logError(file, null, 'Filename or path should not contain dots.');
    }

    // Verify extension on file is .md
    if (path.extname(file.toLowerCase()) !== '.md') {
      logError(file, null, 'File extension must be `.md`');
    }

    // Validate book_path and project_path
    if (!wfRegEx.RE_BOOK_PATH.test(content) && !metadata.include) {
      errMsg = 'Attribute `book_path` missing from top of document';
      logError(file, null, errMsg)
    }
    if (!wfRegEx.RE_PROJECT_PATH.test(content) && !metadata.include) {
      errMsg = 'Attribute `project_path` missing from top of document';
      logError(file, null, errMsg)
    }

    // Validate description
    matched = wfRegEx.RE_DESCRIPTION.exec(content);
    if (matched) {
      let description = matched[1].trim();
      position = {line: getLineNumber(content, matched.index)};
      if (metadata.include) {
        errMsg = 'Included files should not include `description` tags.';
        logError(file, position, errMsg);
      }
      if (description.length === 0) {
        errMsg = 'Attribute `description` cannot be empty';
        logError(file, position, errMsg);
      } else if (description.length > MAX_DESCRIPTION_LENGTH) {
        errMsg = `Attribute \`description\` cannot exceed ${MAX_DESCRIPTION_LENGTH}`;
        errMsg += ` characters, was: ${description.length}`;
        logError(file, position, errMsg);
      }
      if (description.indexOf('<') >= 0 || description.indexOf('`') >= 0) {
        errMsg = 'Attribute `description` cannot contain HTML or markdown, ';
        errMsg += `found: ${description}`;
        logError(file, position, errMsg);
      }
    };

    // Validate wf_updated
    matched = wfRegEx.RE_UPDATED_ON.exec(content);
    if (!metadata.include) {
      if (!matched) {
        errMsg = 'WF Tag `wf_updated_on` is missing (YYYY-MM-DD)';
        logError(file, null, errMsg);
      } else {
        position = {line: getLineNumber(content, matched.index)};
        let d = moment(matched[1], VALID_DATE_FORMATS, true);
        if (d.isAfter(ENFORCE_LINE_LENGHT_AFTER)) {
          enforceLineLength = true;
        }
        if (d.isValid() === false) {
          errMsg = 'WF Tag `wf_updated_on` invalid format (YYYY-MM-DD)';
          errMsg += `, found: ${matched[1]}`;
          logError(file, position, errMsg);
        }
      }
    }

    // Validate wf_published
    matched = wfRegEx.RE_PUBLISHED_ON.exec(content);
    if (!metadata.include) {
      if (!matched) {
        errMsg = 'WF Tag `wf_published_on` is missing (YYYY-MM-DD)';
        logError(file, null, errMsg);
      } else {
        position = {line: getLineNumber(content, matched.index)};
        let d = moment(matched[1], VALID_DATE_FORMATS, true);
        if (d.isAfter(ENFORCE_LINE_LENGHT_AFTER)) {
          enforceLineLength = true;
        }
        if (d.isValid() === false) {
          errMsg = 'WF Tag `wf_published_on` invalid format (YYYY-MM-DD)';
          errMsg += `, found: ${matched[1]}`;
          logError(file, position, errMsg);
        }      
      }
    }

    // Validate featured image path
    matched = wfRegEx.RE_IMAGE.exec(content);
    if (matched) {
      var imgPath = matched[1];
      if (imgPath.indexOf('/web') === 0) {
        imgPath = imgPath.replace('/web', '');
      }
      imgPath = './src/content/en' + imgPath;
      try {
        fs.accessSync(imgPath, fs.R_OK);
      } catch (ex) {
        position = {line: getLineNumber(content, matched.index)};
        errMsg = 'WF Tag `wf_featured_image` found, but couldn\'t find ';
        errMsg += `image - ${matched[1]}`;
        logError(file, position, errMsg);
      }
    }

    // Check for uncommon tags
    matched = wfRegEx.RE_TAGS.exec(content);
    if (matched) {
      position = {line: getLineNumber(content, matched.index)};
      matched[1].split(',').forEach(function(tag) {
        if (commonTags.indexOf(tag.trim()) === -1) {
          errMsg = `Uncommon tag (\`${tag.trim()}\`) found.`;
          logWarning(file, position, errMsg);
        }
      });
    }

    // Check for a single level 1 heading with page title
    matched = wfRegEx.RE_TITLE.exec(content);
    if (!matched && !metadata.include) {
      errMsg = 'Page is missing page title eg: `# TITLE {: .page-title }`';
      logError(file, null, errMsg);
    }
    if (matched && metadata.include) {
      errMsg = 'Include file should not contain a page title!';
      position = {line: getLineNumber(matched.index)};
      logError(file, position, errMsg);
    }

    // Check for only a single instance of the {: .page-title } class
    matched = wfRegEx.getMatches(wfRegEx.RE_TITLE_CLASS, content);
    errMsg = 'Page can only contain ONE title class `{: .page-title }`';
    let maxMatches = 1;
    if (metadata.include) {
      errMsg = 'Includes should not contain any `{: .page-title }` classes.';
      maxMatches = 0;
    }
    if (matched.length > maxMatches) {
      matched.forEach(function(match) {
        position = {line: getLineNumber(content, match.index)};
        logError(file, position, errMsg);
      });
    }

    // Verify authors/translators are in the contributors file
    matched = wfRegEx.getMatches(wfRegEx.RE_AUTHOR_LIST, content);
    matched.forEach(function(match) {
      let key = match[1];
      if (!contributors[key]) {
        position = {line: getLineNumber(content, match.index)};
        errMsg = `Unable to find contributor (\`${key}\`) in contributors file.`;
        logError(file, position, errMsg);
      }
    });

    // Verify all includes start with web/
    matched = wfRegEx.getMatches(wfRegEx.RE_INCLUDES, content);
    matched.forEach(function(include) {
      let inclFile = include[1];
      if (inclFile === 'comment-widget.html' || 
          inclFile.indexOf('web/_shared/contributors/') === 0 ||
          inclFile.indexOf('web/_shared/latest_show.html') === 0) {
        return;
      }
      position = {line: getLineNumber(content, include.index)};
      if (inclFile.indexOf('web/') === 0) {
        let inclPath = inclFile.replace('web/', 'src/content/en/');
        try {
          fs.accessSync(inclPath, fs.R_OK);
        } catch (ex) {
          errMsg = '`{% include %}` tag found, but couldn\'t find related '
          errMsg += 'include ' + inclFile + ' -- ' + inclPath;
          logError(file, position, errMsg);
        }
      } else {
        errMsg = `Include path MUST start with \`web/\` - ${inclFile}`;
        logError(file, position, errMsg);
      }
    });

    // Verify all <<include.md>> markdown files are accessible
    matched = wfRegEx.getMatches(wfRegEx.RE_INCLUDE_MD, content);
    matched.forEach(function(match) {
      let inclPath;
      let inclFile = match[1];
      try {
        inclPath = path.resolve(path.parse(file).dir, inclFile);
        fs.accessSync(inclPath, fs.R_OK);
      } catch (ex) {
        position = {line: getLineNumber(content, match.index)};
        errMsg = `Markdown include ${match[0]} found, but couldn't find `;
        errMsg += `actual file: ${inclPath}`;
        logError(file, position, errMsg);
      }
    });

    // Warn on unescaped template tags
    matched = wfRegEx.getMatches(/\{\{/g, content);
    matched.forEach(function(match) {
      position = {line: getLineNumber(content, match.index)};
      errMsg = 'Template tags (`{{`) should be escaped to `&#123;&#123;`';
      logError(file, position, errMsg);
    });

    // Warn on bad anchor tags
    matched = wfRegEx.getMatches(/{#\w+}/gm, content);
    matched.forEach(function(match) {
      position = {line: getLineNumber(content, match.index)};
      errMsg = 'Unsuppored anchor style used, use `{: #anchor }`, found: ';
      errMsg += `\`${match[0]}\``;
      logError(file, position, errMsg);
    });

    // Warn on missing comment widgets
    let reComment = /^{%\s?include "comment-widget\.html"\s?%}/m;
    let reUpdatesPath = /src\/content\/.+?\/updates\/\d{4}\//;
    if (reUpdatesPath.test(file)) {
      if (!reComment.test(content)) {
        position = {line: getLineNumber(content, content.length -1)};
        errMsg = 'Updates post is missing comment widget: '
        errMsg += '`{% include "comment-widget.html" %}`';
        logWarning(file, position, errMsg);
      }
    }

    remarkLintOptions.firstHeadingLevel = 1;
    if (metadata.include) {
      remarkLintOptions.firstHeadingLevel = 2;
    }

    // remarkLintOptions.maximumLineLength = false;
    // if (enforceLineLength) {
    //   content = content.replace(wfRegEx.RE_DESCRIPTION, '\n');
    //   remarkLintOptions.maximumLineLength = 120;
    // }

    // Use remark to lint the markdown
    let vFile = vfile({path: file, extname: '.md', contents:content});
    remark()
    .use(remarkLint, remarkLintOptions)
    .process(vFile, function(err, vFileResult) {
      if (err) {
        let msg = `Critical linting error: ${err.message}`;
        logError(file, null, msg, err);
        guilt.log('Full Error:', err);
      }
      if (vFileResult) {
        vFileResult.messages.forEach(function(msg) {
          let level = 'ERROR';
          if (msg.level) {
            level = msg.level.toUpperCase();
          }
          let position = {
            line: msg.line,
            column: msg.column
          };
          logMessage(level, file, position, msg.message, msg);
        });
      }
      resolve();
    });
  });
}






gulp.task('test:yaml', function() {
  return new Promise(function(resolve, reject) {
    let files = getFilelist('yaml');
    let yamlFileCount = files.length;
    fileCount += yamlFileCount;
    files.forEach(function(file) {
      parseYaml(file)
      .then(function(yaml) {
        if (--yamlFileCount === 0) {
          resolve();
        }      
      });
    });
  });
});

gulp.task('test:contributors', function() {
  return new Promise(function(resolve, reject) {
    fileCount++;
    parseYaml('./src/data/_contributors.yaml')
    .then(function(contributors) {
      let prevFamilyName = '';
      let keys = Object.keys(contributors);
      let contribCount = keys.length;
      Object.keys(contributors).forEach(function(key) {
        let errMsg;
        let contributor = contributors[key];
        let familyName = contributor.name.family || contributor.name.given;
        if (prevFamilyName.toLowerCase() > familyName.toLowerCase()) {
          errMsg = 'Contributors must be sorted by family name. ';
          errMsg += prevFamilyName + ' came before ' + familyName;
          logError('_contributors.yaml', null, errMsg);
        }
        if (contributor.google && typeof contributor.google !== 'string') {
          errMsg = 'Google+ ID for ' + key + ' must be a string';
          logError('_contributors.yaml', null, errMsg);
        }
        prevFamilyName = familyName;
      });
      resolve();
    });
  });
});

gulp.task('test:findJSFiles', function() {
  return new Promise(function(resolve, reject) {
    let exclude = ['!**/_code/*.js', '!**/event-map.js']
    let files = getFilelist(['js'], exclude);
    fileCount += files.length;
    files.forEach(function(file) {
      logError(file, null, 'JavaScript files are not allowed.');
    });
    resolve();
  });
});

gulp.task('test:validateMarkdown', function() {
  return new Promise(function(resolve, reject) {
    let commonTags;
    let contributors;
    gutil.log(' ', 'Reading', chalk.cyan('commonTags.json'));
    readFile('./src/data/commonTags.json')
    .then(function(tags) {
      commonTags = JSON.parse(tags);
    })
    .then(function() {
      gutil.log(' ', 'Reading', chalk.cyan('contributors.yaml'));
      return parseYaml('./src/data/_contributors.yaml')
      .then(function(yaml) {
        contributors = yaml;
      });
    })
    .then(function() {
      gutil.log(' ', 'Searching for files:', chalk.cyan(MD_EXTENSTIONS.join(', ')));
      GLOBAL.WF.options.testPath = './src/tests/';
      let files = getFilelist(MD_EXTENSTIONS);
      gutil.log(' ', 'Validating markdown files...');
      if (files.length === 0) {
        resolve();
      }
      let mdFileCount = files.length;
      fileCount += mdFileCount;
      files.forEach(function(file) {
        validateMDFile(file, commonTags, contributors)
        .then(function(mdResult) {
          if (--mdFileCount === 0) {
            resolve();
          }
        })
      });
    })
  });
});

gulp.task('test:summary', function() {
  return new Promise(function(resolve, reject) {
    var cFilesWithIssues = Object.keys(filesWithIssues).length;
    gutil.log('');
    gutil.log('Test Completed.');
    gutil.log('Files checked: ', gutil.colors.blue(fileCount));
    gutil.log(' - with issues:', gutil.colors.yellow(cFilesWithIssues));
    gutil.log(' - warnings:   ', gutil.colors.yellow(allWarnings.length));
    gutil.log(' - errors:     ', gutil.colors.red(allErrors.length));
    let result = {
      summary: {
        filesChecked: fileCount,
        filesWithIssues: cFilesWithIssues,
        numWarnings: allWarnings.length,
        numErrors: allErrors.length,
      },
      errors: allErrors,
      warnings: allWarnings
    };
    result = JSON.stringify(result, null, 2);
    fs.writeFileSync(TEST_LOG_FILE, result, 'utf8');
    if (allErrors.length === 0) {
      resolve();
      return;
    }
    let errorMessage = `There were ${allErrors.length} errors.`;
    reject(new Error(errorMessage));
  });
});

gulp.task('test', function(callback) {
  runSequence(
    'test:yaml',
    'test:contributors',
    'test:findJSFiles',
    'test:validateMarkdown',
    'test:summary',
    callback
  );
});
