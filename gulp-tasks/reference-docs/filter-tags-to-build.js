'use strict';

const fs = require('fs-extra');
const path = require('path');

const filterTagsToBuild = (tags, docPath) => {
  return tags.filter((tag) => {
    const outputPath = path.join(docPath, tag);
    return !fs.pathExistsSync(outputPath);
  });
};

module.exports = filterTagsToBuild;
