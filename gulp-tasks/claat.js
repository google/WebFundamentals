'use strict';

let gulp = require('gulp');
let path = require('path');
let glob = require('globule');
let wfHelper = require('./wfHelper');
const runSequence = require('run-sequence');

function getCLAATFiles(srcPath) {
  let cmd = '../../../tools/claat update';
  return new Promise(function(resolve, reject) {
    wfHelper.promisedExec(cmd, srcPath)
    .then(function() {
      let opts = {
        srcBase: srcPath,
        prefixBase: true
      };
      let files = glob.find('**/index.md', opts);
      resolve(files);
    });
  });
}

function pete(src, dest) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log('f', src, dest);
      resolve();
    }, 1000 * Math.floor(Math.random() * 4) + 2);
  })
  .catch(function(err) { console.log('e3', err)});
}

gulp.task('claat:ilt-pwa', function() {
  let srcPath = 'src/ilt/pwa';
  let destPath = 'ilt/pwa';
  return new Promise(function(resolve, reject) {
    getCLAATFiles(srcPath)
    .then(function(files) {
      resolve(Promise.all(files.map(function(file) {
        let srcFile = file;
        let destFile = file.replace(srcPath, '').replace('/index.md', '');
        destFile = path.join(GLOBAL.WF.src.content, destPath, destFile + '.md');
        return pete(srcFile, destFile);
      })));
    })
    .catch(function(err) { console.log('e1', err)});


  })
  .catch(function(err) { console.log('e2', err)});
});



//   // return getCLAATFiles('src/ilt/pwa')
//   // .then(function(files) {
//   //   console.log('f', files);
//   // });


// });
