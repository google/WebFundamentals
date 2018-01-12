/**
 * @fileoverview Generates the Puppeteer docs at /web/tools/puppeteer/
 *
 * @author Eric Bidelman <e.bidelman@google.com>
 */

'use strict';

const gulp = require('gulp');
const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const jsYaml = require('js-yaml');
const {promisify} = require('util');
const semver = require('semver');

const checkoutRepoAtTag = require('../reference-docs/get-source-code');
const wfHelper = require('../wfHelper');

const readFile = promisify(fs.readFile);
const ensureDir = promisify(fs.ensureDir);
const writeFile = promisify(fs.writeFile);

const ORG = 'GoogleChrome';
const USER = 'puppeteer';
const GITHUB_PROJECT_URL = `https://github.com/${ORG}/${USER}`;
const GIT_URL = `${GITHUB_PROJECT_URL}.git`;

const DOC_FILES = [
  'README.md',
  // 'docs/api.md',
  'docs/troubleshooting.md',
  'examples/README.md',
];

const PPTR_FOLDER_PATH = path.join(
  __dirname, '..', '..', 'src', 'content', 'en', 'tools', 'puppeteer'
);

/**
 * Writes a file to disk.
 * @param {string} outputFile Path to output file
 * @param {string} content File content to write.
 */
async function saveFile(outputFile, content) {
  const filePath = path.join(PPTR_FOLDER_PATH, '_src', outputFile);
  await ensureDir(path.dirname(filePath));
  await writeFile(filePath, content);
}

/**
 * Updates _toc.yaml file with latest releases and saves file to disk.
 * @param {string} tocYaml Path to toc yaml file.
 * @param {!Array<string>} tags
 */
async function generateTOC(tocYaml, tags) {
  const yamlContent = await readFile(tocYaml, {encoding: 'utf-8'});
  const yamlJSON = jsYaml.safeLoad(yamlContent);

  // Update/add API Reference section to TOC.
  let apiIdx = yamlJSON.toc.findIndex((item) => item.title === 'API Reference');
  if (apiIdx === -1) {
    apiIdx = yamlJSON.toc.findIndex((item) => item.title === 'Overview') + 1;
    yamlJSON.toc.splice(apiIdx, 0, {
      title: 'API Reference',
      style: 'accordion',
      section: [],
    });
  }

  yamlJSON.toc[apiIdx].section = tags.map((tag, i) => {
    const title = i === 0 ? `${tag} (latest}` : tag;
    return {
      title,
      section: [{
        title: 'Docs',
        path: `${GITHUB_PROJECT_URL}/blob/${tag}/docs/api.md`,
        status: 'external',
      }, {
        title: 'Release Notes',
        path: `${GITHUB_PROJECT_URL}/releases/tag/${tag}`,
        status: 'external',
      }],
    };
  });

  await writeFile(tocYaml, jsYaml.safeDump(yamlJSON));
}

/**
 * Extracts a devsite START/END region from file.
 * @param {string} content
 * @param {string} region Name of region to pull out.
 * @return {string|null}
 */
function extractRegion(content, region) {
  const re = new RegExp(
      `<!-- \\[START ${region}\\] -->([\\s\\S]*)<!-- \\[END ${region}\\] -->`);
  const m = content.match(re);
  return m && m[0] || null;
}

gulp.task('puppeteer:build', async () => {
  const result = await wfHelper.promisedExec(
      `git ls-remote --tags ${GITHUB_PROJECT_URL}`, '.');
  const refs = result.split('\n');
  const tags = refs.map((ref) => ref.split('refs/tags/')[1])
      .sort(semver.rcompare);
  const latestTag = tags[0];

  const tmpDir = path.join(os.tmpdir(), Date.now().toString(), latestTag);
  await checkoutRepoAtTag(GIT_URL, latestTag, tmpDir);

  // Extract sections from README and create separate .md files for them.
  const readme = DOC_FILES.shift();
  let content = await readFile(path.join(tmpDir, readme), {encoding: 'utf-8'});
  await saveFile('_index/badges.md', extractRegion(content, 'badges'));
  await saveFile('_index/usecases.md', extractRegion(content, 'usecases'));
  await saveFile('_index/getstarted.md', extractRegion(content, 'getstarted'));
  await saveFile('_index/debugging.md', extractRegion(content, 'debugging'));
  await saveFile(
      '_index/runtimesettings.md', extractRegion(content, 'runtimesettings'));
  await saveFile('_index/faq.md', extractRegion(content, 'faq'));

  for (const iFile of DOC_FILES) {
    let content = await readFile(path.join(tmpDir, iFile), {encoding: 'utf-8'});
    await saveFile(iFile, content);
  }

  await generateTOC(path.join(PPTR_FOLDER_PATH, '_toc.yaml'), tags);
});
