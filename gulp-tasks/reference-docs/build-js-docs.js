const gutil = require('gulp-util');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const wfHelper = require('../wfHelper');

const canFindJSDocConf = (jsdocConfPath) => {
  try {
    fs.accessSync(jsdocConfPath, fs.F_OK);
    return true;
  } catch (err) {
    gutil.warn(`Unable to find jsdoc Config File @ '${jsdocConfPath}'`);
    gutil.warn(err);
    return false;
  }
};

const buildJSDocs = async (srcCodePath, docOutputPath, jsdocConfPath) => {
  // Make sure the JSDoc conf exists
  if (!canFindJSDocConf(jsdocConfPath)) {
    return;
  }

  // Make sure the JSDoc conf has the "webFundamentals" values
  const jsdocConfigContents = fs.readFileSync(jsdocConfPath);
  const jsdocConfig = JSON.parse(jsdocConfigContents);
  if (!jsdocConfig.webFundamentals) {
    gutil.warn(`In your JSDoc config file you MUST provide a ` +
      `'webFundamentals' property with:`);
    gutil.warn(`    projectRoot`);
    gutil.warn(`    productName`);
    return;
  }

  gutil.log(`Building JSDocs to ` +
    `'${path.relative(process.cwd(), docOutputPath)}'`);

  const webfundmentalRoot = path.join(__dirname, '..', '..');

  const contentPath = path.join(webfundmentalRoot, 'src', 'content', 'en');
  const basePath = path.join(
    path.posix.sep,
    'web',
    path.relative(contentPath, docOutputPath)
  );
  gutil.log(`Using JSDoc basepath=${basePath}`);

  const queryString = [
    `projectRoot=${jsdocConfig.webFundamentals.projectRoot}`,
    `basepath=${basePath}`,
    `productName=${jsdocConfig.webFundamentals.productName}`,
  ].join('&');
  gutil.log(`QueryString: '--query ${queryString}'`);

  const jsDocParams = [
    '--template', path.join(
      webfundmentalRoot, 'src', 'templates', 'reference-docs', 'jsdoc'
    ),
    '-c', jsdocConfPath,
    '-d', docOutputPath,
    '--query', `"${queryString}"`,
  ];

  const jsdocPath = path.join(webfundmentalRoot,
    'node_modules', 'jsdoc', 'jsdoc.js');

  try {
    await wfHelper.promisedExec(
      `${jsdocPath} ${jsDocParams.join(' ')}`, srcCodePath);

    // jsdoc-baseline copies over these files for it's own template
    // but we don't use them for devsite - so remove these files.
    fs.removeSync(path.join(docOutputPath, 'css'));
    fs.removeSync(path.join(docOutputPath, 'scripts'));

    // Web Fundamentals linting errors on developers.google.com
    const allFiles = glob.sync(path.join(docOutputPath, '**', '*'), {
      absolute: true,
    });

    allFiles.forEach((filePath) => {
      const fileContents = fs.readFileSync(filePath).toString();
      const cleanContents = fileContents
        .split('https://developers.google.com/').join('/');
      fs.writeFileSync(filePath, cleanContents);
    });
  } catch (err) {
    // If we error'd, make sure we didn't create a directory that will stop
    // future doc builds.
    fs.removeSync(docOutputPath);
    throw err;
  }
};

module.exports = buildJSDocs;
