import { createStore } from 'redux';
import appReducer from './reducer';

declare const module: any;
export default function configureStore(initialState = {}) {
  const store = createStore(appReducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
