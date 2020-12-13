const axios = require('axios');
const querystring = require('querystring');
const { getToken } = require('./tokens');
const { getCompanyById } = require('../database/methods/companyMethods');

const url = 'https://my.jasminsoftware.com';

exports.makeRequest = async (
  endPoint,
  method,
  companyID,
  params,
  data,
  companyInfo,
) => {
  let company = null;

  if (companyInfo !== undefined && companyInfo !== null) {
    company = companyInfo;
  } else {
    company = await getCompanyById(companyID);
    if (company == null) return 'Company Not Found';
  }

  const token = await getToken(company.app_id, company.app_secret);

  if (token == null) return 'Could not fetch token';

  const urlFollow = `${url}/api/${company.tenant}/${company.organization}/${endPoint}`;

  try {
    const res = await axios({
      method,
      url: urlFollow,
      data,
      params: querystring.stringify(params),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: res.status, data: res.data };
  } catch (error) {
    console.log(`Make Request:\n${JSON.stringify({
      endPoint,
      data,
      companyID,
      params,
      companyInfo,
    }, null, 2)}`);
    console.log(error);
    return error;
  }
};
