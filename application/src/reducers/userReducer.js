import { LOAD_USER, LOGOUT_USER, SET_SETTINGS } from 'actions/userActions';
import api from 'services/api';

const initialState = {
  loggedIn: window.localStorage.getItem('JWT_TOKEN') ? true : false,
  data: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_USER:
      window.localStorage.setItem('JWT_TOKEN', action.data.token);
      window.localStorage.setItem('CIMBA_USER', JSON.stringify(action.data.data));

      api.getSettings(action.data.data.id, (res) => {

        if (res.status === 200) {
          window.localStorage.setItem('CIMBA_COMPANY', JSON.stringify(res.data));
        }
      });

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
