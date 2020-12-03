const axios = require('axios');

const url = 'http://localhost:5050';

exports.getCompany = async (companyId) => {
  const req = await axios.get(`${url}/companies/${companyId}`);

  return req;
};
