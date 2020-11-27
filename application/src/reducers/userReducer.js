import { LOAD_USER, LOGOUT_USER } from 'actions/userActions';

const initialState = {
  loggedIn: window.localStorage.getItem('JWT_TOKEN') ? true : false,
  data: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      window.localStorage.setItem('JWT_TOKEN', action.data);
      return {
        ...state,
        loggedIn: true,
        data: action.data
      };
    case LOGOUT_USER:
      window.localStorage.removeItem('JWT_TOKEN');
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
