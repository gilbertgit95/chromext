const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

// file tobe directly copies to dist folder
const manifestFile =     'manifest.json'
const popupHTML =        'popup.html'

const outDirectory =     path.resolve(__dirname, './dist')
const backgroundOut =   'background.js'
const popupOut =        'popup.js'
const contentOut =      'content.js'

const backgroundEntry =  path.resolve(__dirname, './src/background/index.js')
const popupEntry =       path.resolve(__dirname, './src/popup/index.js')
const contentEntry =     path.resolve(__dirname, './src/content/index.js')

const backgroundProcConfig = {
  entry: backgroundEntry,
  output: {
    filename: backgroundOut,
    path: outDirectory
  }
}

const popupProcConfig = {
  entry: popupEntry,
  output: {
    filename: popupOut,
    path: outDirectory
  }
}

const contentProcConfig = {
  entry: contentEntry,
  output: {
    filename: contentOut,
    path: outDirectory
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve(__dirname, manifestFile),
        to: path.resolve(__dirname, `./dist/${ manifestFile }`)
      },
      {
        from: path.resolve(__dirname, popupHTML),
        to: path.resolve(__dirname, `./dist/${ popupHTML }`)
      }
    ])
  ]
}

module.exports = [
  backgroundProcConfig,
  popupProcConfig,
  contentProcConfig
]