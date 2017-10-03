const gulp = require('gulp');
const remoteGitTags = require('remote-git-tags');
const semver = require('semver');
const fse = require('fs-extra');
const path = require('path');
const os = require('os');
const spawn = require('child_process').spawn;

const PREVIOUS_RELEASES = 1;

const getLatestTags = (gitUrl) => {
  return remoteGitTags(gitUrl)
  .then((gitTagsMap) => Array.from(gitTagsMap.keys()))
  .then((allGitTags) => {
    allGitTags.sort(semver.rcompare);
    return allGitTags.splice(0, PREVIOUS_RELEASES);
  });
};

const getSourceCode = (gitUrl, tag, tmpPath) => {
  fse.ensureDirSync(tmpPath);

  return new Promise((resolve, reject) => {
    const gitDownload = spawn('git', [
      'clone',
      '--branch', tag,
      '--depth', '1',
      '--config', 'advice.detachedHead=false',
      gitUrl,
      tmpPath,
    ], {
      stdio: 'inherit',
    });

    gitDownload.on('error', (err) => {
      console.error(`\n\nUnable to retrieve tag '${tag}' from Git.`);
      console.error(err);
      reject(`Unable to retrieve tag '${tag}' from Git.`);
    });

    gitDownload.on('close', (code) => {
      if (code === 0) {
        resolve(tmpPath);
      } else {
        reject(`Error ${code} returned by command: 'git ${params.join(' ')}'`);
      }
    });
  });
};

const buildJSDocs = (srcCodePath, docOutputPath, jsdocConfPath) => {
  console.log(`\n\n    Building JSDocs to '${path.relative(process.cwd(), docOutputPath)}'.`);

  try {
    fse.accessSync(jsdocConfPath, fse.F_OK);
  } catch (err) {
    console.warn(`Unable to find jsdoc Config File @ '${jsdocConfPath}'`);
    console.warn(err);
    return;
  }

  const jsdocConfig = require(jsdocConfPath);
  if (!jsdocConfig.webFundamentals) {
    console.warn(`In your JSDoc config file you MUST provide a 'webFundamentals' property with:`);
    console.warn(`    projectRoot`);
    console.warn(`    basepath`);
    console.warn(`    productName`);
    return;
  }

  const jsDocParams = [
    '--template', path.join(
      __dirname, '..', 'src', 'templates', 'reference-docs', 'jsdoc'
    ),
    '-c', jsdocConfPath,
    '-d', docOutputPath,
    '--query', [
      `projectRoot=${jsdocConfPath.projectRoot}`,
      `basepath=${jsdocConfPath.basepath}`,
      `productName=${jsdocConfPath.productName}`,
    ].join('&'),
  ];

  const jsdocPath = path.join(__dirname, '..', 'node_modules', 'jsdoc', 'jsdoc.js');

  return new Promise((resolve, reject) => {
    const jsdocProcess = spawn(jsdocPath, jsDocParams, {
      cwd: srcCodePath,
      stdio: 'inherit',
    });

    jsdocProcess.on('error', (err) => {
      console.error('\n\nUnable to run jsdoc.');
      console.error(err);
    });

    jsdocProcess.on('close', (code) => {
      if (code === 0) {
        resolve(docOutputPath);
      } else {
        reject(`Error code: ${code}`);
      }
    });
  })
  .catch(() => {
    // If we error'd, make sure we didn't create a directory that will stop
    // future doc builds.
    fse.removeSync(docOutputPath);

    console.error(`\n\nUnable to build docs for: '${path.relative(process.cwd(), docOutputPath)}'`);

    return null;
  });
};

const generateRefDocs = (projectName, gitUrl, docPath, tag, jsdocConfPath) => {
  // 1. Check if current tag exists, if so return
  const outputPath = path.join(docPath, tag);
  if (fse.pathExistsSync(outputPath)) {
    return;
  }

  console.log(`\n\nNeed to build docs for '${projectName}: ${tag}'`);

  const tmpDirectory = path.join(os.tmpdir(), Date.now().toString());
  const tmpSrCodePath = path.join(tmpDirectory, tag);
  return getSourceCode(gitUrl, tag, tmpSrCodePath)
  .then(() => {
    return buildJSDocs(tmpSrCodePath, outputPath, jsdocConfPath);
  })
  .then(() => {
    fse.removeSync(tmpDirectory);
  }, (err) => {
    fse.removeSync(tmpDirectory);
    throw err;
  });
};

const copyLatestTag = (localPath, latestGitTags) => {
  if (latestGitTags.length === 0) {
    return;
  }

  // Move latest valid to /latest
  const latestPath = path.join(localPath, 'latest');
  let latestValidDocs = path.join(localPath, latestGitTags[0]);
  if (fse.pathExistsSync(latestValidDocs)) {
    fse.copySync(latestValidDocs, latestPath);
  } else {
    console.warn(`Unable to create latest docs for latest tagged release.`);
    console.warn(`This is most likely due to a failed doc build.`);
  }
};

const buildReferenceDocs = (projectName, gitUrl, localPath, jsdocConfPath) => {
  return getLatestTags(gitUrl)
  .then((latestGitTags) => {
    return latestGitTags.reduce(
      (promiseChain, tag) => {
        return promiseChain.then(() => {
          return generateRefDocs(projectName, gitUrl, localPath, tag, jsdocConfPath);
        });
      }, Promise.resolve()
    )
    .then(() => copyLatestTag(localPath, latestGitTags));
  });
};

gulp.task('reference-docs:workbox', () => {
  return buildReferenceDocs(
    'Workbox',
    'https://github.com/GoogleChrome/workbox.git',
    path.join(__dirname, '..', 'src/content/en/tools/workbox/reference-docs/'),
    path.join(__dirname, '..', 'src/content/en/tools/workbox/_jsdoc.conf')
  );
});
