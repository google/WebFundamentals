'use strict';

var gulp = require('gulp');
var glob = require('glob');
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

function checkFiles(globPattern, jekyllRegexs) {
  var files = glob.sync(globPattern);
  var errorCount = 0;
  for (var i = 0; i < files.length; i++) {
    errorCount += testContents(files[i], jekyllRegexs);
  }
  return errorCount;
}

function checkJekyllIssues() {
  var badJekyllStrings = [
    '.url',
    'localize_link'
  ];

  var jekyllRegexs = [];
  for (var i = 0; i < badJekyllStrings.length; i++) {
    var expression = '{{.*(' + badJekyllStrings[i] + ').*}}';
    var regex = new RegExp(expression, 'g');
    jekyllRegexs.push(regex);
  }

  var errorCount = checkFiles('src/content/**/**.{markdown,md,html}',
    jekyllRegexs);
  errorCount += checkFiles('src/jekyll/_{includes,layouts}/**/**.liquid',
    jekyllRegexs);
  return errorCount;
}

gulp.task('tests', function(cb) {
  var errorCount = checkJekyllIssues();

  if(errorCount > 0) {
    throw new Error('Found ' + errorCount + ' issues in the Jekyll Markdown.');
  }

  cb();
});
