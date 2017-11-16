const gulp = require('gulp');
const remoteGitTags = require('remote-git-tags');
const semver = require('semver');
const fse = require('fs-extra');
const path = require('path');
const os = require('os');
const spawn = require('child_process').spawn;
const glob = require('glob');

const PREVIOUS_RELEASES = 0;

const buildJSDocs = (srcCodePath, docOutputPath, jsdocConfPath) => {
  console.log(`\n\n    Building JSDocs to '${path.relative(process.cwd(), docOutputPath)}'.`);

  try {
    fse.accessSync(jsdocConfPath, fse.F_OK);
  } catch (err) {
    console.warn(`Unable to find jsdoc Config File @ '${jsdocConfPath}'`);
    console.warn(err);
    return;
  }

  const contentPath = path.join(__dirname, '..', 'src', 'content', 'en');
  const templateBasePath = path.join(
    path.posix.sep,
    'web',
    path.relative(contentPath, docOutputPath)
  );
  console.log(`\n\n    Using JSDoc basepath=${templateBasePath}.`);

  const jsdocConfigContents = fse.readFileSync(jsdocConfPath);
  const jsdocConfig = JSON.parse(jsdocConfigContents);
  if (!jsdocConfig.webFundamentals) {
    console.warn(`In your JSDoc config file you MUST provide a 'webFundamentals' property with:`);
    console.warn(`    projectRoot`);
    console.warn(`    productName`);
    return;
  }

  const queryString = [
    `projectRoot=${jsdocConfig.webFundamentals.projectRoot}`,
    `basepath=${templateBasePath}`,
    `productName=${jsdocConfig.webFundamentals.productName}`,
  ].join('&');

  const jsDocParams = [
    '--template', path.join(
      __dirname, '..', 'src', 'templates', 'reference-docs', 'jsdoc'
    ),
    '-c', jsdocConfPath,
    '-d', docOutputPath,
    '--query', queryString,
  ];

  console.log(`    JSDoc Params: `, jsDocParams);

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
  .then((docOutputPath) => {
    // jsdoc-baseline copies over these files for it's own template
    // but we don't use them for devsite - so remove these files.
    fse.removeSync(path.join(docOutputPath, 'css'));
    fse.removeSync(path.join(docOutputPath, 'scripts'));

    return docOutputPath;
  })
  .then((docOutputPath) => {
    // Web Fundamentals linting errors on developers.google.com
    const allFiles = glob.sync(path.join(docOutputPath, '**', '*'), {
      absolute: true,
    });
    allFiles.forEach((filePath) => {
      const fileContents = fse.readFileSync(filePath).toString();
      const cleanContents = fileContents
        .split('https://developers.google.com/').join('/');
      fse.writeFileSync(filePath, cleanContents);
    });

    return docOutputPath;
  })
  .catch((err) => {
    // If we error'd, make sure we didn't create a directory that will stop
    // future doc builds.
    fse.removeSync(docOutputPath);

    console.error(`\n\nUnable to build docs for: '${path.relative(process.cwd(), docOutputPath)}'`);
    console.error(err);

    return null;
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

const generateRefDocs = (projectName, gitUrl, docPath, tag, jsdocConfPath, isLatest) => {
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
    if (isLatest) {
      const outputPath = path.join(docPath, 'latest');
      return buildJSDocs(tmpSrCodePath, outputPath, jsdocConfPath);
    }
  })
  .then(() => {
    if (PREVIOUS_RELEASES > 0) {
      return buildJSDocs(tmpSrCodePath, outputPath, jsdocConfPath);
    }
  })
  .then(() => {
    fse.removeSync(tmpDirectory);
  }, (err) => {
    fse.removeSync(tmpDirectory);
    throw err;
  });
};

const buildReferenceDocs = (projectName, gitUrl, localPath, jsdocConfPath) => {
  fse.removeSync(path.join(localPath, 'latest'));

  return generateRefDocs(
    projectName,
    gitUrl,
    localPath,
    'v3',
    jsdocConfPath,
    true
  );
};

gulp.task('workbox:reference-docs-v3', () => {
  return buildReferenceDocs(
    'Workbox',
    'https://github.com/GoogleChrome/workbox.git',
    path.join(__dirname, '..', 'src/content/en/tools/workbox/v3/reference-docs/'),
    path.join(__dirname, '..', 'src/content/en/tools/workbox/v3/_jsdoc.conf')
  );
});
