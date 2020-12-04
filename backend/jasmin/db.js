const axios = require('axios');

const url = 'http://localhost:8080';

exports.getCompany = async (companyId) => {
  try {
    const res = await axios.get(`${url}/companies/${companyId}`);

    return res.data;
  } catch (error) {
    return null;
  }
};
