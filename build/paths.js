const path = require('path');

const paths = {
  project: path.join(__dirname)
};

paths.dist = path.join(paths.project, './src');

module.exports = paths;
