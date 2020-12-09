const { getJasminToken } = require('./auth');

const tokenMap = new Map();

const setInvalidToken = (id) => {
  tokenMap.set(id, { token: '', valid: false });
};

const cacheUserToken = (id, token, expiresIn) => {
  tokenMap.set(id, {
    token,
    valid: true,
  });
  setTimeout(() => {
    setInvalidToken(id);
  }, expiresIn * 1000);
};

exports.getToken = async (id, secret) => {
  const userToken = tokenMap.get(id);

  if (userToken && userToken.valid) return userToken.token;

  const response = await getJasminToken(id, secret);

  if (response == null) return null;

  cacheUserToken(id, response.access_token, response.expires_in);

  return response.access_token;
};
