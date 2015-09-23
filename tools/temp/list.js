'use strict';

var fs = require('fs');
var path = require('path');

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

function recurseDir(dir, rootDir, callback) {
  if (dir.indexOf('_code') === -1) {
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
      var file = path.join(dir, files[i]);
      var stat = fs.statSync(file);
      if (stat.isDirectory()) {
        recurseDir(file, rootDir, callback);
      } else {
        if (file.indexOf('DS_Store') === -1) {
          callback(file);
        }
      }
    }
  }
}

function sentenceCaseTitle(filename) {
  fs.readFile(filename, {'encoding': 'utf8'}, function(err, data) {
    if (err) {
      console.error('ERROR: could not read file: ' + filename);
      console.dir(err);
    } else {
      data = data.replace(/^category: "?(.*?)"?\n/m, '');
      fs.writeFile(filename, data, function(err) {
        if (err) {
          console.error('ERROR: could not write file: ' + filename);
          console.dir(err);
        }
      });
    }
  });
}

var dir = process.argv[2];
recurseDir(dir, dir, function(f) {
  if (f.endsWith('.markdown')) {
    sentenceCaseTitle(f);
  }
});
