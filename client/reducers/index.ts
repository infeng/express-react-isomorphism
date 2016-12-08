import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
const objectAssign = require('object-assign');

declare const require: any;
const context = require.context('./', true, /\.ts$/);
const keys = context.keys().filter(item => item !== './index.ts');

const reducers = keys.reduce((memo, key) => {
  let reducer = context(key);
  if (typeof reducer === 'function') {
    memo[key.match(/([^\/]+)\.ts$/)[1]] = reducer;
  }else if (typeof reducer === 'object') {
    if (reducer.default) {
      memo[key.match(/([^\/]+)\.ts$/)[1]] = reducer.default;
    }else {
      for (let key2 of Object.keys(reducer)) {
        memo[key2] = reducer[key2];
      }
    }
  }
  return memo;
}, {});

const appReducer = combineReducers(objectAssign({}, reducers, {routing}));

export default appReducer;
