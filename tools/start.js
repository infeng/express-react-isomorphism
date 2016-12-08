var express = require('express');
var webpackMiddleware = require('webpack-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
import runServer from './runServer'; 
var webpack = require('webpack');
var webpackConfig = require('../webpack.config');
const [config] = webpackConfig;
var proxy = require('http-proxy-middleware');

const app = express();

const bundler = webpack(webpackConfig);

app.use(webpackMiddleware(bundler, {
  publicPath: config.output.publicPath,
  stats: config.stats,
  noInfo: true,
}));

app.use(webpackHotMiddleware(bundler.compilers[0]));

let handleBundleComplete = async () => {
  handleBundleComplete = () => runServer();
  const server = await runServer();
  app.use('*', proxy({
    target: `http://${server.host}`,
  }));
  app.listen(8048, () => {
    console.log('dev server listening 8048');
  });
};

bundler.plugin('done', () => handleBundleComplete());