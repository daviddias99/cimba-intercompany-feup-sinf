import axios from 'axios';

/**
 * Constant variables
 */
const API_URL = process.env.REACT_APP_API_URI ? process.env.REACT_APP_API_URI : 'http://localhost:8080';
const JTW_TOKEN_KEY = 'JWT_TOKEN';

/**
 * All the server API routes.
 */
const routes = {
  login: '/login',
  logout: '/logout',
  company: (companyId) => `/companies/${companyId}`,
  itemMaps: (companyId) => `/companies/${companyId}/itemMaps`,
  singleItemMap : (companyId, localId) => `/companies/${companyId}/itemMaps/${localId}`,
  companyMaps: (companyId) => `/companies/${companyId}/companyMaps`,
  singleCompanyMap: (companyId, localId) => `/companies/${companyId}/companyMaps/${localId}`,
  settings: (userId) => (`/users/${userId}/company`),
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
  } else if (method.toLowerCase() === 'delete') {
    axios.delete(API_URL + path, { headers }).then(callback).catch(errorHandler);
  }
};

const asyncRequest = async (path, method, data) => {
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

  if (method.toLowerCase() === 'get') {
    return await axios.get(API_URL + path, { headers, params: data })
  } else if (method.toLowerCase() === 'post') {
    return await axios.post(API_URL + path, data, { headers })
  }
}

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
  getCompany: (companyId, callback) => {
    request(routes.company(companyId), 'get', null, callback);
  },
  getCompanyAsync: async (companyId) => {
    return await asyncRequest(routes.company(companyId), 'get', null);
  },
  getSettings: (userId, callback) => {
    request(routes.settings(userId), 'get', null, callback);
  },
  setSettings: (userId, data, callback) => {
    request(routes.settings(userId), 'post', data, callback);
  },
  getItemMaps: (companyId, callback) => {
    request(routes.itemMaps(companyId), 'get', null, callback);
  },
  addItemMap: (companyId, data, callback) => {
    request(routes.itemMaps(companyId), 'post', data, callback);
  },
  deleteItemMap: (companyId, localId, callback) => {
    request(routes.singleItemMap(companyId, localId), 'delete', null, callback);
  },
  getCompanyMaps: (companyId, callback) => {
    request(routes.companyMaps(companyId), 'get', null, callback);
  },
  addCompanyMap: (companyId, data, callback) => {
    request(routes.companyMaps(companyId), 'post', data, callback);
  },
  deleteCompanyMap: (companyId, localId, callback) => {
    request(routes.singleCompanyMap(companyId, localId), 'delete', null, callback);
  },
  getSingleCompanyMapAsync: async (companyId, queryParams) => {
    return await asyncRequest(routes.companyMaps(companyId), 'get', queryParams);
  },
};

export default api;
