const CopyPlugin = require('copy-webpack-plugin');
const path =       require('path');

// file to be directly copies to dist folder
const staticFiles =         'static'
const requiredStaticFiles = ['manifest.json', 'popup.html', 'background.html']

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

// bundle background page related files
const backgroundProcConfig = {
  entry: ['regenerator-runtime/runtime.js', backgroundEntry],
  output: {
    filename: backgroundOut,
    path: outDirectory
  },
  ...loaders
}

// bundle popup page related files
const popupProcConfig = {
  entry: popupEntry,
  output: {
    filename: popupOut,
    path: outDirectory
  },
  ...loaders
}

// bundle page content related files
const contentProcConfig = {
  entry: contentEntry,
  output: {
    filename: contentOut,
    path: outDirectory
  },
  ...loaders,
  plugins: [
    new CopyPlugin([
      ...requiredStaticFiles.map((sFile) => {
        return {
          from: path.resolve(__dirname, sFile),
          to: path.resolve(__dirname, `${ distFolder }/${ sFile }`)
        }
      }),
      ...[{
        from: path.resolve(__dirname, staticFiles),
        to: path.resolve(__dirname, `${ distFolder }/${ staticFiles }`)
      }]
    ])
  ]
}

module.exports = [
  backgroundProcConfig,
  popupProcConfig,
  contentProcConfig
]