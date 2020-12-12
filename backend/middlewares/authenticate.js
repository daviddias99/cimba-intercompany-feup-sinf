const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const authenticate = async (req, res, next) => {
  // token is being sent to us throught the authorization header
  const { authorization } = req.headers;

  // Check if authorization header is set
  if (authorization === null || authorization === undefined || typeof authorization !== 'string') {
    return res.status(401).json({ status: 401 });
  }

  // Check if header is in a valid format
  const splitted = authorization.split(' ');
  if (splitted.length !== 2) {
    return res.status(400).json({ status: 400 });
  }

  // get token and JWT secret
  const token = splitted[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);

    // Check if token is valid
    const userId = decoded.sub;
    const userSession = await req.app.db('sessions').where('user_id', userId).first();
    if (!userSession) {
      return res.status(400).json({ status: 400 });
    }

    // Check if user exists
    const user = await req.app.db('users').where('users.id', userSession.user_id).first();

    if (!user) {
      return res.status(401).json({ status: 401 });
    }
    // store user
    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 500 });
  }
};

module.exports = authenticate;
