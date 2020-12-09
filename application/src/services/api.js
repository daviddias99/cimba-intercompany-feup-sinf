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
  itemMaps: (companyId) => `/companies/${companyId}/itemMaps`,
  singleItemMap : (companyId, mapId) => `/companies/${companyId}/itemMaps/${mapId}`,
  companyMaps: (companyId) => `/companies/${companyId}/companyMaps`,
  singleCompanyMap: (companyId, mapId) => `/companies/${companyId}/companyMaps/${mapId}`,
  getSettings: (userId) => (`/users/${userId}/company`),
  setSettings: (userId) => (`/users/${userId}/company`),
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
const request = (path, method, data, callback) => {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  if (!path.endsWith('/')) {
    path = path + '/';
  }

  console.log(path)

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

    const res = { data: { status: 'error', error: err } };
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
  getItemMaps: (companyId, callback) => {
    request(routes.itemMaps(companyId), 'get', null, callback);
  },
  addItemMap: (companyId, data, callback) => {
    request(routes.itemMaps(companyId), 'post', data, callback);
  },
  deleteItemMap: (companyId, mapId, callback) => {
    request(routes.singleItemMap(companyId, mapId), 'delete', null, callback);
  },
  getCompanyMaps: (companyId, callback) => {
    request(routes.companyMaps(companyId), 'get', null, callback);
  },
  addCompanyMap: (companyId, data, callback) => {
    request(routes.companyMaps(companyId), 'post', data, callback);
  },
  deleteCompanyMap: (companyId, mapId, callback) => {
    request(routes.singleCompanyMap(companyId, mapId), 'delete', null, callback);
  },
};

export default api;
