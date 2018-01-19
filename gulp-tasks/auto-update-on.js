const gulp = require('gulp');
const fse = require('fs-extra');
const moment = require('moment');
const wfHelper = require('./wfHelper');
const wfRegEx = require('./wfRegEx');

/**
 * Gets the list of changed files
 * @return {Promise<Array<String>>} Returns array of changed Files.
 */
async function getChangedFiles() {
  let cmd = 'git --no-pager diff --name-only ' +
    '$(git merge-base origin/master HEAD)';

  const results = await wfHelper.promisedExec(cmd, '.');

  return results.split('\n');
}

gulp.task('auto-update-on', async () => {
  if (process.env.TRAVIS) {
    // Do nothing on Travis.
    return;
  }

  const changedFiles = await getChangedFiles();

  for (const changedFile of changedFiles) {
    try {
      await fse.access(changedFile);
    } catch (err) {
      // File removed
      continue;
    }

    const fileContents = (await fse.readFile(changedFile)).toString();
    const matched = wfRegEx.RE_UPDATED_ON.exec(fileContents);
    if (!matched) {
      // Updated on not in the file - nothing to do.
      continue;
    }

    const originalUpdatedOn = matched[0];
    const originalTimestamp = matched[1];
    const newTimeStamp = moment().format(`YYYY-MM-DD`);
    if (originalTimestamp === newTimeStamp) {
      continue;
    }

    const newUpdatedOn = originalUpdatedOn.replace(
      originalTimestamp, newTimeStamp);
    const newContents = fileContents.replace(originalUpdatedOn, newUpdatedOn);
    await fse.writeFile(changedFile, newContents);
  }
});
