'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence').use(gulp);

var sourcePath = 'src/content/en/showcase/';
var destPath = 'build/langs/en';

var regexDoNotPublish = /^{#\s*wf_published:\s*false\s*#}/m;
var regexPublishedOn = /^{#\s*wf_published_on:\s*(\S+)\s*#}/m;
var regexTitle = /^#\s*(.*?)\s*{: .page-title }/m;
var regexImage = /^{#\s*wf_featured_image:\s*(\S+)\s*#}/m;
var regexSnippet = /^{#\s*wf_featured_snippet:\s*(.+?)\s*#}/m;

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

function recurseDir(dir) {
  var result = [];
  var files = fs.readdirSync(dir);
  files.forEach(function(filename) {
    var file = path.join(dir, filename);
    var stat = fs.statSync(file);
    if (stat.isDirectory()) {
      result = result.concat(recurseDir(file));
    } else if (file.endsWith('.md')) {
      result.push(file);
    }
  });
  return result;
}

function sortByDate(a, b) {
  if (a.publishedOn < b.publishedOn) {
    return 1;
  } else if (a.publishedOn > b.publishedOn) {
    return -1;
  }
  return 0;
}

// This task moves content into the jekyll directory
gulp.task('showcase:copy', function() {
  return gulp.src([
    path.join(sourcePath, '/**/*'),
    '!' + path.join(sourcePath, '_index.yaml'),
    '!' + path.join(sourcePath, '_template.md')
  ])
    .pipe(plugins.copy(destPath, {prefix: 3}));
});

gulp.task('showcase:build-index', function() {
  var caseStudies = [];
  var casestudyList = recurseDir(sourcePath);
  casestudyList.forEach(function(filename) {

    var casestudy = fs.readFileSync(filename).toString();
    var published = !regexDoNotPublish.test(casestudy);
    var publishedOn = regexPublishedOn.exec(casestudy);
    var title = regexTitle.exec(casestudy);
    var featuredImage = regexImage.exec(casestudy);
    var snippet = regexSnippet.exec(casestudy);
    var pathToFile = filename.replace(sourcePath, '').replace('.md', '');
    if (published) {
      var summary = {
        filename: filename,
        title: title[1],
        publishedOn: publishedOn[1],
        path: pathToFile
      };
      if (featuredImage && featuredImage[1]) {
        summary.image = featuredImage[1];
      }
      if (snippet && snippet[1]) {
        summary.snippet = snippet[1];
      }
      caseStudies.push(summary);
    }
  });
  caseStudies.sort(sortByDate);
  var template = fs.readFileSync(sourcePath + '/_index.yaml').toString();
  for (var i = 0; i < 15; i++) {
    template = template.replace('[[title_' + i + ']]', caseStudies[i].title);
    template = template.replace('[[snippet_' + i + ']]', caseStudies[i].snippet);
    template = template.replace('[[image_' + i + ']]', caseStudies[i].image);
    template = template.replace('[[path_' + i + ']]', caseStudies[i].path);
  }
  fs.writeFileSync(path.join(destPath, 'showcase/_index.yaml'), template);
});

gulp.task('showcase:clean', del.bind(null,
  [destPath], {dot: true}));

// Copies and builds the files needed for the showcase section
gulp.task('showcase', function(cb) {
  runSequence('showcase:copy', ['showcase:build-index'], cb);
});
