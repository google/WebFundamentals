'use strict';

var fs = require('fs');
var path = require('path');
var YAML = require('js-yaml');

console.log('Migration Assistant');
console.log(' - Helps migrate content to the new Web Fundamentals folder structure');
console.log('   This file is only meant as a temporary tool and should be removed');
console.log('   once the migration has been completed.');
console.log('Usage: node migrate.js path/to/files/');
console.log('');
if (!process.argv[2]) {
  console.log('Error: no path provided.');
}

var yamlOptions = {
  indent: 2,
  skipInvalid: false
};

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

function checkTags(yaml, filename) {
  var checkOrder = true;
  var tags = [];
  if (yaml.order && checkOrder) {
    tags.push('order');
  }
  if (tags.length > 0) {
    console.log('Invalid Tags:', filename, tags.join(', '));
  }
}

function updateFile(filename) {
  fs.readFile(filename, {'encoding': 'utf8'}, function(err, data) {
    if (err) {
      console.error('ERROR: could not read file: ' + filename);
      console.dir(err);
    } else {
      // console.log('Cleaning up YAML ' + filename);
      data = data.replace(/\r\n/gm, '\n');
      data = data.replace(/\n\r/gm, '\n');
      data = data.replace(/\r/gm, '\n');
      var yamlStart = data.indexOf('---\n');
      var yamlStop = data.indexOf('---\n', yamlStart + 1);
      var yamlString = data.substring(yamlStart, yamlStop);
      var yaml;
      var yamlDump;
      try {
        yaml = YAML.load(yamlString);
        checkTags(yaml, filename);
        // if (yaml.order) {
        //   console.log('Invalid Tag: order', filename);
        // }
      } catch (ex) {
        console.log('Parse Error: ', filename, ex.message);
        return;
      }
      try {
        yamlDump = YAML.dump(yaml, yamlOptions);
      } catch (ex) {
        console.log('Dump Error:  ', filename, ex.message);
        return;
      }
      //console.log('File OK:     ', filename);
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

//updateFile(process.argv[2]);

var dir = process.argv[2];
recurseDir(dir, dir, function(f) {
  if (f.endsWith('.markdown')) {
    updateFile(f);
  }
});
