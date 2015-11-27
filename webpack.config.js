module.exports = {
  entry: {
    background: "./chromeextension/src/background/background.js",
    browser_action: "./chromeextension/src/browser_action/browser_action.js",
    content_scripts: "./chromeextension/src/content_scripts/content_scripts.js",
  },
  output: {
    path: "./chromeextension/dist",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
};
