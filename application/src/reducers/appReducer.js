import { combineReducers } from 'redux';

import globalReducer from './globalReducer';
import userReducer from './userReducer';

const appReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
});

export default appReducer;
