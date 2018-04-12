/**
 * @fileoverview Helper utilities used to build/generate WebFundamentals.
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const fs = require('fs');
const chalk = require('chalk');
const RSync = require('rsync');
const glob = require('globule');
const moment = require('moment');
const mkdirp = require('mkdirp');
const gutil = require('gulp-util');
const wfRegEx = require('./wfRegEx');
const testHelper = require('./tests/helpers');
const exec = require('child_process').exec;

const NO_DATE = '1900-01-01';
const STD_EXCLUDES = ['!**/_generated.md', '!**/_template.md'];

if (!String.prototype.endsWith) {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function(searchString, position) {
      const subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      const lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    },
  });
}

/**
 * Executes a shell command and returns the result in a promise.
 *
 * @param {string} cmd The command to run.
 * @param {string} cwd The working directory to run the command in.
 * @return {Promise} The promise that will be resolved on completion.
 */
function promisedExec(cmd, cwd) {
  return new Promise(function(resolve, reject) {
    const cmdLog = chalk.cyan(`$ ${cmd}`);
    gutil.log(' ', cmdLog);
    const execOptions = {
      cwd: cwd,
      maxBuffer: 1024 * 1024,
    };
    exec(cmd, execOptions, function(err, stdOut, stdErr) {
      stdOut = stdOut.trim();
      stdErr = stdErr.trim();
      if (err) {
        gutil.log(' ', cmdLog, chalk.red('FAILED'));
        reject(err);
        return;
      }
      gutil.log(' ', cmdLog, chalk.green('OK'));
      resolve(stdOut);
    });
  });
}

/**
 * Uses RSync to copy files from one directory to another.
 *
 * @param {string} src The source to copy.
 * @param {string} dest The destination to copy to.
 * @return {Promise} The promise that will be resolved on completion.
 */
function promisedRSync(src, dest) {
  gutil.log(' ', chalk.blue('rsync'), src, '->', dest);
  return new Promise(function(resolve, reject) {
    if (fs.existsSync(src) === false) {
      gutil.log(' ', chalk.red(src), 'doesn\'t exist.');
      resolve();
    }
    const rsync = new RSync()
      .source(src)
      .destination(dest)
      .archive()
      .exclude('.git*')
      .exclude('.DS_Store');
    mkdirp.sync(dest);
    rsync.execute(function(error, code, cmd) {
      if (code !== 0) {
        gutil.log(' ', 'Copying', chalk.blue(src), chalk.red('Failed!'));
        // eslint-disable-next-line no-console
        console.log(error);
        reject(error);
        return;
      }
      resolve();
    });
  });
}

/**
 * Ascending sorting comparator for generic inputs
 *  Note: string comparison is case insenstitive
 *
 * @param {Object} a The first item to be compared.
 * @param {Object} b The second item to be compared.
 * @return {number} -1,0,1.
 */
function genericComparator(a, b) {
  if (typeof a === 'string') {
    a = a.toLowerCase();
  }
  if (typeof b === 'string') {
    b = b.toLowerCase();
  }
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
}

/**
 * Descending sorting comparator for datePublishedMoment
 * - if values are equal, it uses updatedComparator
 *
 * @param {Object} aObj The first object to be compared.
 * @param {Object} bObj The second object to be compared.
 * @return {number} -1,0,1.
 */
function publishedComparator(aObj, bObj) {
  const aVal = aObj.datePublishedMoment;
  const bVal = bObj.datePublishedMoment;
  if (aVal.isBefore(bVal)) {
    return 1;
  } else if (aVal.isAfter(bVal)) {
    return -1;
  } else {
    return updatedComparator(aObj, bObj);
  }
}

/**
 * Descending sorting comparator for dateUpdatedMoment
 * - if values are equal, it uses the article title
 *
 * @param {Object} aObj The first object to be compared.
 * @param {Object} bObj The second object to be compared.
 * @return {number} -1,0,1.
 */
function updatedComparator(aObj, bObj) {
  const aVal = aObj.dateUpdatedMoment;
  const bVal = bObj.dateUpdatedMoment;
  if (aVal.isBefore(bVal)) {
    return 1;
  } else if (aVal.isAfter(bVal)) {
    return -1;
  } else {
    return genericComparator(aObj.title, bObj.title);
  }
}

/**
 * Descending sorting comparator for dateFeaturedMoment
 * - if values are equal, it uses updatedComparator
 *
 * @param {Object} aObj The first object to be compared.
 * @param {Object} bObj The second object to be compared.
 * @return {number} -1,0,1.
 */
function featuredComparator(aObj, bObj) {
  const aVal = aObj.dateFeaturedMoment;
  const bVal = bObj.dateFeaturedMoment;
  if (aVal.isBefore(bVal)) {
    return 1;
  } else if (aVal.isAfter(bVal)) {
    return -1;
  } else {
    return updatedComparator(aObj, bObj);
  }
}

/**
 * Gets the first regEx match on a string
 *
 * @deprecated Use wfRegEx.getMatch instead
 *
 * @param {RegEx} regEx The regex to test.
 * @param {string} content The content to search.
 * @param {string} [defaultResponse] The default response to provide.
 * @return {string} The regex match.
 */
function getRegEx(regEx, content, defaultResponse) {
  // eslint-disable-next-line no-console, max-len
  console.log(chalk.red('WARN:'), chalk.cyan('wfHelper.getRegEx'), 'is deprecated');
  const result = content.match(regEx);
  if (result && result[1]) {
    return result[1];
  }
  return defaultResponse;
}

/**
 * Reads the metadata from a markdown file
 *
 * @param {string} file The path to the file to read.
 * @return {Object} the meta data of the file.
 */
function readMetadataForFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  if (testHelper.isInclude(file, content)) {
    return null;
  }
  let description = wfRegEx.getMatch(wfRegEx.RE_SNIPPET, content);
  if (!description) {
    description = wfRegEx.getMatch(wfRegEx.RE_DESCRIPTION, content);
  }
  let published = moment(wfRegEx.getMatch(wfRegEx.RE_PUBLISHED_ON, content));
  published = published.utcOffset(0, true);
  let updated = moment(wfRegEx.getMatch(wfRegEx.RE_UPDATED_ON, content));
  updated = updated.utcOffset(0, true);
  let featured = wfRegEx.getMatch(wfRegEx.RE_FEATURED_DATE, content, NO_DATE);
  featured = moment(featured).utcOffset(0, true);
  const url = file
    .replace('src/content/en/', '/web/')
    .replace('.md', '')
    .replace('.html', '')
    .replace(/\/index$/, '/');
  let result = {
    filePath: file,
    url: url,
    title: wfRegEx.getMatch(wfRegEx.RE_TITLE, content),
    description: description,

    image: wfRegEx.getMatch(wfRegEx.RE_IMAGE, content),
    imageSquare: wfRegEx.getMatch(wfRegEx.RE_IMAGE_SQUARE, content),

    datePublishedMoment: published,
    datePublishedMonth: published.format('MM'),
    datePublishedYear: published.format('YYYY'),

    dateUpdatedMoment: updated,
    dateUpdatedMonth: updated.format('MM'),
    dateUpdatedYear: updated.format('YYYY'),

    tags: [],
    vertical: wfRegEx.getMatch(wfRegEx.RE_VERTICAL, content),

    dateFeaturedMoment: featured,
    dateFeaturedMonth: featured.format('MM'),
    dateFeaturedYear: featured.format('YYYY'),
  };
  const authorList = content.match(wfRegEx.RE_AUTHOR_LIST);
  if (authorList) {
    result.authors = [];
    authorList.forEach(function(contributor) {
      const author = wfRegEx.getMatch(wfRegEx.RE_AUTHOR_KEY, contributor);
      result.authors.push(author.trim());
    });
  }
  const region = wfRegEx.getMatch(wfRegEx.RE_REGION, content);
  if (region) {
    result.region = region.trim();
  }
  const tags = wfRegEx.getMatch(wfRegEx.RE_TAGS, content);
  if (tags) {
    result.tags = [];
    tags.split(',').forEach(function(tag) {
      tag = tag.trim();
      if (tag.length > 0) {
        result.tags.push(tag);
      }
    });
  }
  const podcast = wfRegEx.getMatch(wfRegEx.RE_PODCAST, content);
  if (podcast) {
    result.podcast = {
      audioUrl: podcast,
      duration: wfRegEx.getMatch(wfRegEx.RE_PODCAST_DURATION, content),
      subtitle: wfRegEx.getMatch(wfRegEx.RE_PODCAST_SUBTITLE, content),
      fileSize: wfRegEx.getMatch(wfRegEx.RE_PODCAST_SIZE, content),
    };
  }
  return result;
}

/**
 * Gets a list of files that match a specific pattern
 *
 * @param {string} base The base path to look.
 * @param {Array} patterns A list of glob patters to look for.
 * @return {Array} A list of files along with their metadata.
 */
function getFileList(base, patterns) {
  let results = [];
  const opts = {
    srcBase: base,
    prefixBase: true,
  };
  const files = glob.find(patterns, STD_EXCLUDES, opts);
  files.forEach(function(file) {
    const metaData = readMetadataForFile(file);
    if (metaData) {
      results.push(metaData);
    }
  });
  return results;
}

/**
 * Splits a list of files by year published
 *
 * @param {Array} files The array of files to split.
 * @return {Object} A list of files split by year.
 */
function splitByYear(files) {
  let result = {};
  files.forEach(function(file) {
    const year = file.datePublishedYear;
    if (!result[year]) {
      result[year] = [];
    }
    result[year].push(file);
  });
  return result;
}

/**
 * Splits a list of files by month published
 *
 * @param {Array} files The array of files to split.
 * @return {Array} A list of files split by month.
 */
function splitByMonth(files) {
  let result = [];
  files.forEach(function(file) {
    const month = parseInt(file.datePublishedMonth, 10);
    if (!result[month]) {
      result[month] = {
        title: moment.months()[month - 1],
        articles: [],
      };
    }
    result[month].articles.push(file);
  });
  return result;
}

/**
 * Splits a list of files by author
 *
 * @param {Array} files The array of files split.
 * @return {Object} A list of files split by author.
 */
function splitByAuthor(files) {
  let result = {};
  files.forEach(function(file) {
    let authors = file.authors || [];
    authors.forEach(function(author) {
      if (!result[author]) {
        result[author] = [];
      }
      result[author].push(file);
    });
  });
  return result;
}

/**
 * Formats a moment() object to: YYYY-MM-DDTHH:mm:ssZ
 * Example: 2017-07-13T13:31:13Z
 * Note: simply a shortcut to dateFormatISO
 *
 * @param {Object} dt The moment object to export.
 * @return {string} YYYY-MM-DDTHH:mm:ssZ.
 */
function dateFormatAtom(dt) {
  return dateFormatISO(dt);
}

/**
 * Formats a moment() object to: YYYY-MM-DDTHH:mm:ssZ
 * Example: 2017-07-13T13:31:13Z
 *
 * @param {Object} dt The moment object to export.
 * @return {string} YYYY-MM-DDTHH:mm:ssZ.
 */
function dateFormatISO(dt) {
  return dt.format('YYYY-MM-DDTHH:mm:ss[Z]');
}

/**
 * Formats a moment() object to: YYYY-MM-DD
 * Example: 2017-07-13
 *
 * @param {Object} dt The moment object to export.
 * @return {string} YYYY-MM-DD.
 */
function dateFormatISOShort(dt) {
  return dt.format('YYYY-MM-DD');
}

/**
 * Formats a moment() object to: dddd, MMMM Do YYYY
 * Example: Friday, July 13th 2017
 *
 * @param {Object} dt The moment object to export.
 * @return {string} dddd, MMMM Do YYYY.
 */
function dateFormatPretty(dt) {
  return dt.format('dddd, MMMM Do YYYY');
}

/**
 * Formats a moment() object to: DD MMM YYYY HH:mm:ss GMT
 * Example: 13 Jul 2017 13:31:13 GMT
 *
 * @param {Object} dt The moment object to export.
 * @return {string} DD MMM YYYY HH:mm:ss GMT.
 */
function dateFormatRSS(dt) {
  return dt.format('DD MMM YYYY HH:mm:ss [GMT]');
}

exports.promisedRSync = promisedRSync;
exports.promisedExec = promisedExec;
exports.getRegEx = getRegEx;
exports.getFileList = getFileList;
exports.publishedComparator = publishedComparator;
exports.updatedComparator = updatedComparator;
exports.featuredComparator = featuredComparator;
exports.splitByYear = splitByYear;
exports.splitByMonth = splitByMonth;
exports.splitByAuthor = splitByAuthor;
exports.dateFormatAtom = dateFormatAtom;
exports.dateFormatISO = dateFormatISO;
exports.dateFormatISOShort = dateFormatISOShort;
exports.dateFormatPretty = dateFormatPretty;
exports.dateFormatRSS = dateFormatRSS;
