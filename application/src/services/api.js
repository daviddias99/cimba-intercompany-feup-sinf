import axios from 'axios';

/**
 * Constant variables
 */
const API_URL = process.env.REACT_APP_API_URI ? process.env.REACT_APP_API_URI : 'http://localhost:8001';
const JTW_TOKEN_KEY = 'JWT_TOKEN';

/**
 * All the server API routes.
 */
const routes = {
  login: '/login',
  logout: '/logout',
  getSettings: (userId) => (`/users/${userId}/company`),
  setSettings: (userId) => (`/users/${userId}/company`),
  getOrder: (processId) => (`/process/${processId}/order`),
  getTransportation: (processId) => (`/process/${processId}/transportation`),
  getInvoice: (processId) => (`/process/${processId}/invoice`),
  getFinancial: (processId) => (`/process/${processId}/financial`),
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
const request = (path, method, data, callback) => {
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
    callback(res);
  };

  if (method.toLowerCase() === 'get') {
    axios.get(API_URL + path, { headers }).then(callback).catch(errorHandler);
  } else if (method.toLowerCase() === 'post') {
    axios.post(API_URL + path, data, { headers }).then(callback).catch(errorHandler);
  }
};

/**
 * Main API controller.
 *
 * Deals with all communication between
 * the app and the server.
 */
const api = {
  login: (data, callback) => {
    request(routes.login, 'post', data, callback);
  },
  logout: (callback) => {
    request(routes.logout, 'post', null, callback);
  },
  getSettings: (userId, callback) => {
    request(routes.getSettings(userId), 'get', null, callback);
  },
  setSettings: (userId, data, callback) => {
    request(routes.setSettings(userId), 'post', data, callback);
  },
  getOrder: (processId, callback) => {
    request(routes.getOrder(processId), 'get', null, callback)
  },
  getTransportation: (processId, callback) => {
    request(routes.getTransportation(processId), 'get', null, callback)
  },
  getInvoice: (processId, callback) => {
    request(routes.getInvoice(processId), 'get', null, callback)
  },
  getFinancial: (processId, callback) => {
    request(routes.getFinancial(processId), 'get', null, callback)
  },

};

export default api;
