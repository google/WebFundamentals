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

var STD_EXCLUDES = ['!**/_generated.md', '!**/_template.md'];

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
        const output = (stdOut + '\n' + stdErr).trim();
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
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  }
  return 0;
}

function publishedComparator(a, b) {
  var aPublished = moment(a.datePublished).unix();
  var bPublished = moment(b.datePublished).unix();
  if (aPublished === bPublished) {
    aPublished = a.title;
    bPublished = b.title;
  }
  return genericComparator(aPublished, bPublished);
}

function updatedComparator(a, b) {
  var aPublished = moment(a.dateUpdated).unix();
  var bPublished = moment(b.dateUpdated).unix();
  if (aPublished === bPublished) {
    aPublished = a.title;
    bPublished = b.title;
  }
  return genericComparator(aPublished, bPublished);
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
  var updated = moment(wfRegEx.getMatch(wfRegEx.RE_UPDATED_ON, content));
  var url = file.replace('src/content/en/', '/web/');
  url = url.replace('.md', '');
  var result = {
    filePath: file,
    url: url,
    title: wfRegEx.getMatch(wfRegEx.RE_TITLE, content),
    description: description,
    authors: [],
    image: wfRegEx.getMatch(wfRegEx.RE_IMAGE, content),
    datePublished: published.format(),
    datePublishedPretty: published.format('dddd, MMMM Do YYYY'),
    yearPublished: published.format('YYYY'),
    dateUpdated: updated.format(),
    dateUpdatedPretty: updated.format('dddd, MMMM Do YYYY'),
    tags: []
  };
  var authorList = content.match(wfRegEx.RE_AUTHOR_LIST);
  if (authorList) {
    authorList.forEach(function(contributor) {
      var author = wfRegEx.getMatch(wfRegEx.RE_AUTHOR_KEY, contributor).trim();
      result.authors.push(author);
    });
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
      fileSize: wfRegEx.getMatch(wfRegEx.RE_PODCAST_SIZE, content),
      pubDate: published.format('DD MMM YYYY HH:mm:ss [GMT]')
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
  // var filename = path.join(base, '_files.json');
  // fs.writeFileSync(filename, JSON.stringify(results, null, 2));
  return results;
}

function splitByYear(files) {
  var result = {};
  files.forEach(function(file) {
    var year = file.yearPublished;
    if (!result[year]) {
      result[year] = [];
    }
    result[year].push(file);
  });
  return result;
}

exports.promisedRSync = promisedRSync;
exports.promisedExec = promisedExec;
exports.getRegEx = getRegEx;
exports.getFileList = getFileList;
exports.publishedComparator = publishedComparator;
exports.updatedComparator = updatedComparator;
exports.splitByYear = splitByYear;
