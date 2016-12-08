import { handleActions } from 'redux-actions';
const objectAssign = require('object-assign');

export default handleActions({
  ['add count']: (state, action) => {
    return objectAssign({}, state, {
      count: state.count + 1,
    });
  },
}, {
  count: 0,
});
