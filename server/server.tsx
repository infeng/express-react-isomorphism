import * as express from 'express';
const app = express();
import * as path from 'path';
import * as ejs from 'ejs';
import * as http from 'http';
import applyMiddlewares from './applyMiddlewares';
import routes from './routes';

// 设置渲染模板
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

applyMiddlewares(app);

// 设置静态目录
app.use(express.static(path.join(__dirname, '../build/public/static')));

app.use('*', routes);

const server = http.createServer(app);

server.listen(8048, (err) => {
  console.log('server listening on port: 8048');
});
