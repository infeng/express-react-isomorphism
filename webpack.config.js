console.log(process.env.NODE_ENV);

var webpack = require('webpack');
var path = require('path');
var rucksack = require('rucksack-css');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');

let entry = {
  index: [
    './client/index.tsx',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',      
  ],
};
if (process.env.NODE_ENV === 'production') {
  entry = {
    index: './client/index.tsx',
  };
}

let clientPlugins = [
  new ExtractTextPlugin('[name].css', {
    disable: false,
    allChunks: true,
  }),    
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),  
];
if (process.env.NODE_ENV === 'production') {
  clientPlugins = clientPlugins.concat([
    new UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __SERVER__: false
    }),
    new HtmlWebpackPlugin({
      filename: '../../server/views/index.html',
      template: './server/views/index.prod.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,   
      },
      hash: true,
    }),
  ]);
}

let babelQuery = {
  "presets": ["es2015-ie", "stage-0", "react"],
  "plugins": ["add-module-exports", "transform-runtime","transform-decorators-legacy", ["import", {
     "libraryName": "antd",
     "style": true
   }]]  
};

let clientConfig = {
  babel: babelQuery,
  ts: {
    transpileOnly: true,
    configFileName: './client/tsconfig.json',
  }, 
  entry: entry,
  output: {
    path: path.join(__dirname, '/build/public/static'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel'],
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel', 'ts'],
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(['css?sourceMap&-autoprefixer!', 'postcss', 'less?sourceMap']),      
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: `url?limit=10000&minetype=application/font-woff`, 
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/font-woff',
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/octet-stream',
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file',
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=image/svg+xml',
    }, {
      test:  /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
      loader: 'url?limit=10000&name=[sha512:hash:base64:7].[ext]',
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.html?$/,
      loader: 'html?name=[name].[ext]', 
    }],
  },
  postcss: [
    rucksack(),
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
    })
  ],  
  plugins: clientPlugins,
};

if (process.env.NODE_ENV === 'development') {
  clientConfig.devtool = '#source-map';
}

let configs = [clientConfig];

if (process.env.NODE_ENV === 'production') {
  var fs = require('fs');
  var nodeModules = fs.readdirSync('node_modules')
    .filter(function (i) {
      return ['.bin', '.npminstall'].indexOf(i) === -1
    });  
  let serverBabelQuery = Object.assign({}, babelQuery, {
    plugins: babelQuery.plugins.concat(
      [["babel-plugin-transform-require-ignore", {
        "extensions": [".less", ".css"]
      }]]   
    ),
  });
  let serverConfig = {
    babel: serverBabelQuery,
    ts: {
      transpileOnly: true,
      configFileName: './server/tsconfig.json',
      compilerOptions: {
        sourceMap: false,
      },
    },     
    entry: ['./server/server.tsx'],
    output: {
      path: path.join(__dirname, '/build/server'),
      filename: 'index.js',
      publicPath: '/',
    },
    target: 'node',
    node: {
      fs: 'empty',
      __dirname: true,
      __filename: true
    },
    externals: [
      function (context, request, callback) {
        var pathStart = request.split('/')[0]
        if (pathStart && (pathStart[0] === '!') || nodeModules.indexOf(pathStart) >= 0 && request !== 'webpack/hot/signal.js') {
          return callback(null, 'commonjs ' + request)
        }
        callback()
      }
    ],    
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],       
      }, {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['babel', 'ts'],
      }, {
        test:  /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'url?limit=10000&name=[sha512:hash:base64:7].[ext]',        
      }],
    },
    resolve: {
      extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new UglifyJsPlugin({
        compress: { warnings: false }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      })
    ]    
  };
  configs.push(serverConfig);
}

module.exports = configs;