import * as express from 'express';
const router = express.Router();
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import routes from '../../client/routes';
import { RouterContext, match } from 'react-router';
import configureStore from '../../client/store';
import { Provider } from 'react-redux';
let initState = {
  app: {
    count: 13,
  },
};
const store = configureStore(initState);

/* GET home page. */
router.use((req, res, next) => {
  match({routes: routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      let html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>,
      );
      res.render('index', {
        title: 'qqmadmin-ssr',
        html: html,
        reduxData: initState,
      });
    }
  });
});

export default router;
