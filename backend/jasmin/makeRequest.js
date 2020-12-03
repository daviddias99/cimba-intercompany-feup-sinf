const axios = require('axios');
const { getToken } = require('./tokens');
const { getCompany } = require('./db');

const url = 'https://identity.primaverabss.com/connect/token';
// const scope = 'application';
// const grantType = 'client_credentials';

const makeUrl = (endPoint, query, company) => {
  let urlFollow = `${url}/api/${company.tenant}/${company.organization}/${endPoint}?`;

  if (query) {
    Object.keys(query).forEach((key) => {
      if (query[key]) urlFollow += `${key}=${query[key]}&`;
    });
  }

  return urlFollow;
};

exports.makeRequest = async (
  endPoint,
  method,
  data,
  query,
  companyID,
) => {
  const company = await getCompany(companyID);

  const token = await getToken(companyID);

  const urlFollow = makeUrl(endPoint, query, company);
  const res = await axios({
    method,
    urlFollow,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return res;
};
