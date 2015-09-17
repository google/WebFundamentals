'use strict';

var fs = require('fs');
var path = require('path');





function renameFile(filename) {
  var newFilename = filename.replace(/\d{4}-\d{2}-\d{2}-/, '');
  fs.rename(filename, newFilename, function(err) {
    if (err) {
      console.log('ERROR', filename, err);
    }
  });
}

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

var dir = process.argv[2];
recurseDir(dir, dir, function(f) {
  if (f.endsWith('.markdown')) {
    renameFile(f);
  }
});
