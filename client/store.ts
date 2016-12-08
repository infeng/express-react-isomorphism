import { createStore } from 'redux';
import appReducer from './reducers';

declare const module: any;
export default function configureStore(initialState = {}) {
  const store = createStore(appReducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
