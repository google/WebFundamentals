'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();
var through = require('through2');
var gutil = require('gulp-util');

var sourcePath = 'src/content/en/showcase';
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

function sortByDate(a, b) {
  if (a.publishedOn < b.publishedOn) {
    return 1;
  } else if (a.publishedOn > b.publishedOn) {
    return -1;
  }
  return 0;
}

var createIndex = function(pathToTemplate, generatedFileName) {
  var snippets = [];
  var firstFile = null;

  function parseAndExtract(file, enc, cb) {
    var parsedFile;
    if (!firstFile) {
      firstFile = file;
    }
    // Read the file and get the meta data
    if (file.relative.endsWith('.md')) {
      parsedFile = file.contents.toString('utf8');
      var published = !regexDoNotPublish.test(parsedFile);
      if (published) {
        var publishedOn = regexPublishedOn.exec(parsedFile);
        var title = regexTitle.exec(parsedFile);
        var featuredImage = regexImage.exec(parsedFile);
        var snippet = regexSnippet.exec(parsedFile);
        var summary = {
          filename: file.relative,
          title: title[1],
          publishedOn: publishedOn[1],
          path: file.path.replace('.md', ''),
          image: featuredImage[1]
        };
        if (snippet && snippet[1]) {
          summary.snippet = snippet[1];
        }
        snippets.push(summary);
      }
    }
    cb();
  }

  function endStream(cb) {
    if (!firstFile) {
      return cb();
    }
    snippets.sort(sortByDate);
    var basePath = path.dirname(firstFile.path) + path.sep;
    var tpl = fs.readFileSync(pathToTemplate).toString();
    for (var i = 0; i < 15; i++) {
      var title = snippets[i].title.replace(/\"/g, '&quot;');
      tpl = tpl.replace('[[title_' + i + ']]', title);
      var snippetText = snippets[i].snippet.replace(/\"/g, '&quot;');
      tpl = tpl.replace('[[snippet_' + i + ']]', snippetText);
      tpl = tpl.replace('[[image_' + i + ']]', snippets[i].image);
      var relativePath = snippets[i].path.replace(basePath, '');
      tpl = tpl.replace('[[path_' + i + ']]', relativePath);
    }
    var generatedFile = new gutil.File({
      base: firstFile.base,
      cwd: firstFile.cwd,
      path: path.join(firstFile.base, generatedFileName),
      contents: new Buffer(tpl)
    });
    this.push(generatedFile);
    cb();
  }
  return through.obj(parseAndExtract, endStream);
};

gulp.task('showcase', function() {
  var indexTemplate = path.join(sourcePath, '_index.yaml');
  return gulp.src([
    path.join(sourcePath, '/**/*'),
    '!' + path.join(sourcePath, '_template.md')
  ])
    .pipe(plugins.copy(destPath, {prefix: 3}))
    .pipe(createIndex(indexTemplate, 'showcase/_index.yaml'))
    .pipe(gulp.dest(destPath));
});

gulp.task('showcase:clean', del.bind(null, [destPath], {dot: true}));

