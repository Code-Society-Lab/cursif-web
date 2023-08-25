const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')  // Assuming your source code is in the 'src' directory
    }
  }
};
