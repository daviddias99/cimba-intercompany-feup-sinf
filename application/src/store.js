import { createStore } from 'redux';

import appReducer from 'reducers/appReducer';

let devTools;
if (process.env.NODE_ENV === 'development') {
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(appReducer, devTools);

export default store;
