const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './src');

const configDirs = {
  BUILD_DIR,
  APP_DIR,
};

const buildConfig = env => {
  if (env === 'dev' || env === 'prod') {
    return require('./config/' + env + '.js')(configDirs);
  } else {
    console.log("Wrong webpack build parameter. Possible choices: 'dev' or 'prod'.")
  }
};

module.exports = buildConfig;
