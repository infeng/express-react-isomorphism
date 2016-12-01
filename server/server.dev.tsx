process.env.NODE_ENV = 'development';

import * as express from 'express';
const app = express();
import * as path from 'path';
import * as ejs from 'ejs';
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let webpack = require('webpack');
let webpackConfig = require('../webpack.dev.js');
import * as http from 'http';
import applyMiddlewares from './applyMiddlewares';
let compiler = webpack(webpackConfig);
import routes from './routes';
const chokidar = require('chokidar');

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  publicPath: '/',
  stats: {
    colors: true,
  },
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

// 设置渲染模板
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

applyMiddlewares(app);

// 设置静态目录
app.use(express.static(path.join(__dirname, '/build/public/static')));

app.use('*', routes);

const server = http.createServer(app);

let isListened = false;
compiler._plugins['after-compile'].push((compilation, callback) => {
  callback();
  if (!isListened) {
    server.listen(8048, (err) => {
      console.log('server listening on port: 8048');
      isListened = true;
    });
  }
});
