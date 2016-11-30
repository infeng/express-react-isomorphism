import { handleActions } from 'redux-actions';
import * as objectAssign from 'object-assign';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = handleActions({
  ['add count']: (state, action) => {
    return objectAssign({}, state, {
      count: state.count + 1,
    });
  },
}, {
  count: 0,
});

const appReducer = combineReducers({rootReducer, routing});

export default appReducer;
