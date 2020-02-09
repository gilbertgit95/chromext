const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

// file to be directly copies to dist folder
const manifestFile =     'manifest.json'
const popupHTML =        'popup.html'

// the distribution folder or the actual chrome extension
const distFolder =       './dist'

const backgroundOut =    'background.js'
const popupOut =         'popup.js'
const contentOut =       'content.js'
const outDirectory =     path.resolve(__dirname, distFolder)

const backgroundEntry =  path.resolve(__dirname, './src/background/index.js')
const popupEntry =       path.resolve(__dirname, './src/popup/index.js')
const contentEntry =     path.resolve(__dirname, './src/content/index.js')

const loaders = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // Some change here
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
  // resolve: {
  //   extensions: ['', '.js', '.jsx', '.css'],
  //   modulesDirectories: [
  //     'node_modules'
  //   ]
  // }
}

const backgroundProcConfig = {
  entry: backgroundEntry,
  output: {
    filename: backgroundOut,
    path: outDirectory
  },
  ...loaders
}

const popupProcConfig = {
  entry: popupEntry,
  output: {
    filename: popupOut,
    path: outDirectory
  },
  ...loaders
}

const contentProcConfig = {
  entry: contentEntry,
  output: {
    filename: contentOut,
    path: outDirectory
  },
  ...loaders,
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve(__dirname, manifestFile),
        to: path.resolve(__dirname, `${ distFolder }/${ manifestFile }`)
      },
      {
        from: path.resolve(__dirname, popupHTML),
        to: path.resolve(__dirname, `${ distFolder }/${ popupHTML }`)
      }
    ])
  ]
}

module.exports = [
  backgroundProcConfig,
  popupProcConfig,
  contentProcConfig
]