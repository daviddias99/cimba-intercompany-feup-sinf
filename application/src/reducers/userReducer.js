import { LOAD_USER, LOGOUT_USER} from 'actions/userActions';

const initialState = {
  loggedIn: window.localStorage.getItem('JWT_TOKEN') ? true : false,
  data: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_USER:
      window.localStorage.setItem('JWT_TOKEN', action.data.token);
      window.localStorage.setItem('CIMBA_USER', JSON.stringify(action.data.data));

      return {
        ...state,
        loggedIn: true,
      };
    case LOGOUT_USER:
      window.localStorage.removeItem('JWT_TOKEN');
      window.localStorage.removeItem('CIMBA_USER');
      window.localStorage.removeItem('CIMBA_COMPANY');

      return {
        ...state,
        loggedIn: false,
        data: action.data
      };
    default:
      return state;
  }
};


export default reducer;
