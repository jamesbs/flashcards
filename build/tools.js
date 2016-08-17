const paths = require('./paths');
const path = require('path');

const trimFS = p => p.replace(/^\/|\/$/, '');

const generatePath = (parts, ...values) => {
  const resolution = values.reduce(
    (acc, value, index) => [...acc, parts[index], paths[value]],
    []
  );

  resolution.push(parts.slice(-1)[0])

  return path.join(...resolution);
};

module.exports = {
  generatePath,
};
