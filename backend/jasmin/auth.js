const axios = require('axios');
const querystring = require('querystring');

const url = 'https://identity.primaverabss.com/connect/token';
const scope = 'application';
const grantType = 'client_credentials';

exports.getJasminToken = async (clientId, clientSecret) => {
  try {
    const response = await axios({
      url,
      method: 'post',
      data: querystring.stringify({
        scope,
        grant_type: grantType,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    return null;
  }
};
