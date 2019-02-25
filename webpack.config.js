const path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/')
  }
};