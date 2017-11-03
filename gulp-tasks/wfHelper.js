'use strict';

/*
    wfHelper.js
 */

const fs = require('fs');
const chalk = require('chalk');
const RSync = require('rsync');
const glob = require('globule');
const moment = require('moment');
const mkdirp = require('mkdirp');
const gutil = require('gulp-util');
const wfRegEx = require('./wfRegEx');
const exec = require('child_process').exec;

const STD_EXCLUDES = ['!**/_generated.md', '!**/_template.md'];

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
      maxBuffer: 1024 * 1024
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
      console.log(src, 'doesnt exist');
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
        console.log(error);
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function genericComparator(a, b) {
  if (typeof a === 'string') {
    a = a.toLowerCase();
  }
  if (typeof b === 'string') {
    b = b.toLowerCase();
  }
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  }
  return 0;
}

function publishedComparator(aObj, bObj) {
  const aVal = aObj.datePublishedMoment;
  const bVal = bObj.datePublishedMoment;
  if (aVal.isBefore(bVal)) {
    return 1;
  } else if (aVal.isAfter(bVal)) {
    return -1;
  } else {
    return genericComparator(aObj.title, bObj.title);
  }
}

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

function getRegEx(regEx, content, defaultResponse) {
  console.log(chalk.red('WARN:'), chalk.cyan('wfHelper.getRegEx'), 'is deprecated');
  var result = content.match(regEx);
  if (result && result[1]) {
    return result[1];
  }
  return defaultResponse;
}

function readMetadataForFile(file) {
  var content = fs.readFileSync(file, 'utf8');
  if (content.match(wfRegEx.RE_MD_INCLUDE)) {
    return null;
  }
  var description = wfRegEx.getMatch(wfRegEx.RE_SNIPPET, content);
  if (!description) {
    description = wfRegEx.getMatch(wfRegEx.RE_DESCRIPTION, content);
  }
  var published = moment(wfRegEx.getMatch(wfRegEx.RE_PUBLISHED_ON, content));
  published = published.utcOffset(0, true);
  var updated = moment(wfRegEx.getMatch(wfRegEx.RE_UPDATED_ON, content));
  updated = updated.utcOffset(0, true);
  var featured = moment(wfRegEx.getMatch(wfRegEx.RE_FEATURED_DATE, content, '1900-01-01'));
  featured = featured.utcOffset(0, true);
  var url = file.replace('src/content/en/', '/web/');
  url = url.replace('.md', '');
  var result = {
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
  var authorList = content.match(wfRegEx.RE_AUTHOR_LIST);
  if (authorList) {
    result.authors = [];
    authorList.forEach(function(contributor) {
      var author = wfRegEx.getMatch(wfRegEx.RE_AUTHOR_KEY, contributor).trim();
      result.authors.push(author);
    });
  }
  var region = wfRegEx.getMatch(wfRegEx.RE_REGION, content);
  if (region) {
    result.region = region;
  }
  var tags = wfRegEx.getMatch(wfRegEx.RE_TAGS, content);
  if (tags) {
    result.tags = [];
    tags.split(',').forEach(function(tag) {
      tag = tag.trim();
      if (tag.length > 0) {
        result.tags.push(tag.trim());
      }
    });
  }
  var podcast = wfRegEx.getMatch(wfRegEx.RE_PODCAST, content);
  if (podcast) {
    result.podcast = {
      audioUrl: podcast,
      duration: wfRegEx.getMatch(wfRegEx.RE_PODCAST_DURATION, content),
      subtitle: wfRegEx.getMatch(wfRegEx.RE_PODCAST_SUBTITLE, content),
      fileSize: wfRegEx.getMatch(wfRegEx.RE_PODCAST_SIZE, content)
    };
  }
  return result;
}

function getFileList(base, patterns) {
  var results = [];
  var opts = {
    srcBase: base,
    prefixBase: true
  };
  var files = glob.find(patterns, STD_EXCLUDES, opts);
  files.forEach(function(file) {
    var metaData = readMetadataForFile(file);
    if (metaData) {
      results.push(metaData);
    }
  });
  return results;
}

function splitByYear(files) {
  var result = {};
  files.forEach(function(file) {
    var year = file.datePublishedYear;
    if (!result[year]) {
      result[year] = [];
    }
    result[year].push(file);
  });
  return result;
}

function splitByMonth(files) {
  var result = [];
  files.forEach(function(file) {
    const month = parseInt(file.datePublishedMonth, 10);
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

function splitByAuthor(files) {
  var result = {};
  files.forEach(function(file) {
    var authors = file.authors || [];
    authors.forEach(function(author) {
      if (!result[author]) {
        result[author] = [];
      }
      result[author].push(file);
    });
  });
  return result;
}

function dateFormatAtom(dt) {
  return dateFormatISO(dt);
}

function dateFormatISO(dt) {
  return dt.format('YYYY-MM-DDTHH:mm:ss[Z]');
}

function dateFormatISOShort(dt) {
  return dt.format('YYYY-MM-DD');
}

function dateFormatPretty(dt) {
  return dt.format('dddd, MMMM Do YYYY');
}

function dateFormatRSS(dt) {
  return dt.format('DD MMM YYYY HH:mm:ss [GMT]')
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
exports.dateFormatPretty = dateFormatPretty
exports.dateFormatRSS = dateFormatRSS;
