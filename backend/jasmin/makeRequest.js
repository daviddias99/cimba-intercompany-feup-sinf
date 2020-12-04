const axios = require('axios');
const querystring = require('querystring');
const { getToken } = require('./tokens');
const { getCompany } = require('./db');

const url = 'https://my.jasminsoftware.com';
// const scope = 'application';
// const grantType = 'client_credentials';

exports.makeRequest = async (
  endPoint,
  method,
  params,
  data,
  companyID,
) => {
  const company = await getCompany(companyID);

  if (company == null) return 'Company Not Found';

  const token = await getToken(company.app_id, company.app_secret);

  if (token == null) return 'Could not fetch token';

  const urlFollow = `${url}/api/${company.tenant}/${company.organization}/${endPoint}`;

  try {
    const res = await axios({
      method,
      url: urlFollow,
      data: querystring.stringify(data),
      params: querystring.stringify(params),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
