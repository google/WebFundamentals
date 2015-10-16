'use strict';

var gulp = require('gulp');
var globby = require('globby');
var fs = require('fs');

function testContents(filename, regularExpressions) {
  var fileContents = fs.readFileSync(filename);
  var errorCount = 0;

  for (var i = 0; i < regularExpressions.length; i++) {
    var match = regularExpressions[i].exec(fileContents);
    if (match !== null) {
      if (errorCount === 0) {
        console.log();
        console.log('////////////////////////////////////////');
        console.log();
        console.log('These regexs:');
      }
      console.log('    ' + regularExpressions[i]);
      errorCount++;
    }
  }

  if (errorCount > 0) {
    console.log();
    console.log('Were found in: ');
    console.log('    ' + filename);
    console.log();
    console.log('////////////////////////////////////////');
    console.log();
  }
  return errorCount;
}

function checkFiles(globPatterns, jekyllRegexs) {
  var files = globby.sync(globPatterns);
  var errorCount = 0;
  for (var i = 0; i < files.length; i++) {
    errorCount += testContents(files[i], jekyllRegexs);
  }
  return errorCount;
}

function checkJekyllIssues() {
  // Double blackslash because we want the final regex to have '\.'
  var badJekyllStrings = [
    '\\.url',
    'localize_link',
    '\\.article\\.'
  ];

  var jekyllRegexs = [];
  var expression;
  var regex;
  for (var i = 0; i < badJekyllStrings.length; i++) {
    expression = '{{.*(' + badJekyllStrings[i] + ').*}}';
    regex = new RegExp(expression, 'g');
    jekyllRegexs.push(regex);
  }

  // We exclude the resources markdown file because it explains why not to use
  // .url
  var errorCount = checkFiles(
    [
      'src/content/**/**.{markdown,md,html}',
      '!src/content/**/resources/jekyll/custom-jekyll-variables.markdown'
    ],
    jekyllRegexs);
  errorCount += checkFiles('src/jekyll/_{includes,layouts}/**/**.liquid',
    jekyllRegexs);
  return errorCount;
}

gulp.task('tests', function(cb) {
  var errorCount = checkJekyllIssues();

  if (errorCount > 0) {
    throw new Error('Found ' + errorCount + ' issues in the Jekyll Markdown.');
  }

  cb();
});
