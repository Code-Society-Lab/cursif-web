const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/app'),
      '@config': path.resolve(__dirname, 'src/config') 
    }
  }
};
