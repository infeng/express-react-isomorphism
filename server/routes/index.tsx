import * as express from 'express';
const router = express.Router();
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import App from '../../client/App';
import configureStore from '../../client/store';
import { Provider } from 'react-redux';
const store = configureStore();

/* GET home page. */
router.get('/', (req, res, next) => {
  let html = ReactDOMServer.renderToStaticMarkup(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  res.render('index', {
    title: 'qqmadmin-ssr',
    html: html,
    reduxData: {},
  });
});

export default router;
