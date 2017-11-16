'use strict';

const gulp = require('gulp');
const path = require('path');
const glob = require('globule');
const wfHelper = require('./wfHelper');
const wfCodeLabHelper = require('./wfCodeLabHelper');

/**
 * Update the files using the claat tool then return a list of files
 *
 * @param {string} srcPath Where to run the claat tool.
 * @return {Promise} The promise with the list of all files updated.
 */
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

/**
 * Updates files, and copies them to the appropriate directory
 *
 * @param {string} srcPath The source directory to find the files.
 * @param {string} destBase The destination to copy to.
 * @param {Boolean} flatten Whether to flatten the files to one directory.
 * @param {string} bookPath The location of the book.yaml file
 * @param {string} projPath The location of the project.yaml file
 * @return {Promise} The promise that will be resolved on completion.
 */
function exportAndUpdate(srcPath, destBase, flatten, bookPath, projPath) {
  return getCLAATFiles(srcPath)
  .then(function(files) {
    return Promise.all(files.map(function(file) {
      let srcFile = file;
      let srcImgPath = file.replace('index.md', 'img/');
      let destDir = file.replace(srcPath, '').replace('/index.md', '');
      destDir = path.join(destBase, destDir);
      let destFile = path.join(destDir, 'index.md');
      if (flatten === true) {
        destDir = path.resolve(destDir, '..');
        destFile = destFile.replace('/index.md', '.md');
      }
      let destImgPath = path.join(destDir, 'img');
      wfCodeLabHelper.updateCodeLab(srcFile, destFile, bookPath, projPath);
      return wfHelper.promisedRSync(srcImgPath, destImgPath);
    }));
  });
}

gulp.task('claat:codelabs', function() {
  const srcPath = 'src/data/codelabs';
  const destPath = path.join(GLOBAL.WF.src.content, 'fundamentals/codelabs');
  const bookPath = '/web/fundamentals/_book.yaml';
  const projPath = '/web/fundamentals/_project.yaml';
  return exportAndUpdate(srcPath, destPath, false, bookPath, projPath);
});

gulp.task('claat:ilt-pwa', function() {
  const srcPath = 'src/data/ilt-pwa';
  const destPath = path.join(GLOBAL.WF.src.content, 'ilt/pwa');
  const bookPath = '/web/ilt/pwa/_book.yaml';
  const projPath = '/web/_project.yaml';
  return exportAndUpdate(srcPath, destPath, true, bookPath, projPath);
});
