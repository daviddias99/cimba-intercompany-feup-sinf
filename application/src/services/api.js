import axios from 'axios';

/**
 * Constant variables
 */
const API_URL = process.env.REACT_APP_API_URI ? process.env.REACT_APP_API_URI : 'http://localhost:8002';
const JTW_TOKEN_KEY = 'JWT_TOKEN';

/**
 * All the server API routes.
 */
const routes = {
  login: '/login',
  logout: '/logout',
  getActivity: (loggerId) => (`logger/${loggerId}/activity`),
  getBots: (loggerId, nRequests, curPage) => (`logger/${loggerId}/bots?n_req=${nRequests}&page=${curPage}`),
  getLogs: (loggerId, nRequests, curPage) => (`logger/${loggerId}/logs?n_req=${nRequests}&page=${curPage}`)
};

/**
 * Gets the user session token
 * from localStorage.
 */
const getToken = () => localStorage.getItem(JTW_TOKEN_KEY);

/**
 * Makes an authenticated request
 * to the path specified.
 *
 * In case the user is not authenticated,
 * makes an unauthenticated request.
 */
const request = (path, method, data, _cb) => {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  if (!path.endsWith('/')) {
    path = path + '/';
  }

  const headers = {};

  // Add authorization header
  const token = getToken();
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }

  const errorHandler = (err) => {
    if (err.response) { // Server replied with non 2xx
    } else if (err.request) { // Network error / Server did not reply
    } else { // Other error
    }

    const res = { data: { status: 'error' } };
    _cb(res);
  };

  if (method.toLowerCase() === 'get') {
    axios.get(API_URL + path, { headers }).then(_cb).catch(errorHandler);
  } else if (method.toLowerCase() === 'post') {
    axios.post(API_URL + path, data, { headers }).then(_cb).catch(errorHandler);
  }
};

/**
 * Main API controller.
 *
 * Deals with all communication between
 * the app and the server.
 */
const api = {
  login: (data, _cb) => {
    request(routes.login, 'post', data, _cb);
  },
  logout: (_cb) => {
    request(routes.logout, 'post', null, _cb);
  },
  getActivity: (loggerId, _cb) => {
    request(routes.getActivity(loggerId), 'get', null, _cb);
  },
  getBots: (loggerId, nRequests, curPage, _cb) => {
    request(routes.getBots(loggerId, nRequests, curPage), 'get', null, _cb);
  },
  getLogs: (loggerId, nRequests, curPage, _cb) => {
    request(routes.getLogs(loggerId, nRequests, curPage), 'get', null, _cb);
  },
};

export default api;
