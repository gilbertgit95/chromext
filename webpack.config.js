const CopyPlugin = require('copy-webpack-plugin');
const path =       require('path');

// file to be directly copies to dist folder
const staticFiles =      ['manifest.json', 'popup.html', 'icon.png']

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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // Some change here
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
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
    new CopyPlugin(
      staticFiles.map((sFile) => {
        return {
          from: path.resolve(__dirname, sFile),
          to: path.resolve(__dirname, `${ distFolder }/${ sFile }`)
        }
      })
    )
  ]
}

module.exports = [
  backgroundProcConfig,
  popupProcConfig,
  contentProcConfig
]