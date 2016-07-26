'use strict';

var yaml = require('js-yaml');
var fs = require('fs');

var twitterLink = '<a href="https://twitter.com/[[URL]]" class="wf-twitter">@[[URL]]</a>';
var homepageLink = '<a href="[[URL]]" class="wf-homepage">[[URL]]</a>\n';
var googleplusLink = '<a href="https://plus.google.com/[[URL]]" class="wf-googleplus">Google+</a>';
var githubLink = '<a href="https://github.com/[[URL]]" class="wf-github">[[URL]]</a>';

function loadAndParseContributors() {
  var contributors;
  try {
    var yamlDoc = fs.readFileSync('./src/data/_contributors.yaml', 'utf8');
    contributors = yaml.safeLoad(yamlDoc);
  } catch (ex) {
    console.error('Unable to read & parse the contributors file.', ex);
    process.exit(1);
  }
  var results = [];
  var keys = Object.keys(contributors);
  keys.forEach(function(key) {
    var contributor = contributors[key];
    var result = {key: key, photo: key, social: []};
    var cName = [];
    if (contributor.name.given) {
      cName.push(contributor.name.given);
    }
    if (contributor.name.family) {
      cName.push(contributor.name.family);
    }
    result.name = cName.join(' ');
    var description = contributor.name.given + ' is a contributor to ';
    description += 'Web<b>Fundamentals</b>';
    if (contributor.description && contributor.description.en) {
      description = contributor.description.en;
    }
    result.description = description;
    if (contributor.noPhoto) {
      result.photo = 'no-photo';
    }
    if (contributor.homepage) {
      result.social.push(homepageLink.replace(/\[\[URL\]\]/g, contributor.homepage));
    }
    if (contributor.twitter) {
      result.social.push(twitterLink.replace(/\[\[URL\]\]/g, contributor.twitter));
    }
    if (contributor.google) {
      result.social.push(googleplusLink.replace(/\[\[URL\]\]/g, contributor.google));
    }
    if (contributor.github) {
      result.social.push(githubLink.replace(/\[\[URL\]\]/g, contributor.github));
    }
    result.roles = contributor.roles;
    results.push(result);
  });
  return results;
}

function generateContributorIncludes(contributors, template) {
  contributors.forEach(function(contributor) {
    var result = template;
    result = result.replace(/\[\[KEY\]\]/g, contributor.key);
    result = result.replace(/\[\[NAME\]\]/g, contributor.name);
    result = result.replace('[[PHOTO]]', contributor.photo);
    result = result.replace('[[DESCRIPTION]]', contributor.description);
    var filename = './src/content/en/_shared/contributors/';
    filename += contributor.key + '.html';
    fs.writeFileSync(filename, result);
  });
}

function generateContributorsPage(contributors, template) {
  var result = [];
  result.push('project_path: /web/_project.yaml');
  result.push('book_path: /web/resources/_book.yaml');
  result.push('');
  result.push('');
  result.push('<style>');
  result.push('.wf-byline h3 {margin: 0;}');
  result.push('.wf-byline .attempt-left {margin: 0 16px 16px 0;}');
  result.push('.wf-byline img {border-radius: 100%; width: 64px;}');
  result.push('.wf-byline .wf-byline-desc {font-size: smaller;}');
  result.push('.wf-byline .wf-byline-social {font-size: smaller;}');
  result.push('</style>');
  result.push('');
  result.push('# Contributors to WebFundamentals {: .page-title }');
  result.push('');
  result.push('<table class="columns responsive">');
  contributors.forEach(function(contributor, index) {
    var item = template;
    if (index % 2 === 0) {
      result.push('<tr>');
    }
    item = item.replace(/\[\[KEY\]\]/g, contributor.key);
    item = item.replace(/\[\[NAME\]\]/g, contributor.name);
    item = item.replace('[[PHOTO]]', contributor.photo);
    item = item.replace('[[DESCRIPTION]]', contributor.description);
    item = item.replace('[[SOCIAL]]', contributor.social.join('\n'));
    result.push(item);
    if (index % 2 === 1) {
      result.push('</tr>');
    }
  });
  result.push('</table>');
  var filename = './src/content/en/resources/contributors.md';
  fs.writeFileSync(filename, result.join('\n'));
}

var includeTemplate = fs.readFileSync('./src/templates/contributor-include.html', 'utf8');
var listTemplate = fs.readFileSync('./src/templates/contributor-list.html', 'utf8');
var contributors = loadAndParseContributors();
generateContributorIncludes(contributors, includeTemplate);
generateContributorsPage(contributors, listTemplate);

