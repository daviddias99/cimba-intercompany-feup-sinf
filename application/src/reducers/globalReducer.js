import { CHANGE_CURRENT_LOGGER } from 'actions/globalActions';

const initialState = {
  currentLogger: window.localStorage.getItem('last-logger') ? window.localStorage.getItem('last-logger') : '7a868e7e-f034-484c-8df2-7c82be03115a',
  loggers: [ // FIXME: remove hardcoded values
    { id: '7a868e7e-f034-484c-8df2-7c82be03115a', name: 'Alphabet', notifications: 0 },
    { id: 'ff0c8268-cab3-42b5-bee9-31853a14c5dc', name: 'Banana', notifications: 1 },
    { id: '7a0c5a01-02dd-48b8-96ed-cc31a3198533', name: 'Computer', notifications: 0 },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_LOGGER:
      window.localStorage.setItem('last-logger', action.logger);
      return {
        ...state,
        currentLogger: action.logger
      };
    default:
      return state;
  }
};


export default reducer;
