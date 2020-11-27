
/**
 * Action constants
 */
const LOAD_USER = 'LOAD_USER';
const LOGOUT_USER = 'LOGOUT_USER';

/**
 * Action creators
 */
const loadUser = (data) => ({
  type: LOAD_USER,
  data: data
});

const logoutUser = (data) => ({
  type: LOGOUT_USER,
  data: data
});

export {
  LOAD_USER, loadUser,
  LOGOUT_USER, logoutUser,
};
