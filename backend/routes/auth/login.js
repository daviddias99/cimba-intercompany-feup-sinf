const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../../config');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  // Check if authorization header is set
  const { authorization } = req.headers;
  if (authorization !== null && authorization !== undefined) {
    return res.json({ status: 401, message: 'Authorization header already set' });
  }

  // Check if user exists
  const user = await req.app.db('users').where('username', username).first();
  if (!user) {
    return res.json({ status: 404, message: 'Username or password is incorrect' });
  }

  // Check if password matches
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return res.json({ status: 404, message: 'Username or password is incorrect' });
  }

  // check if user already has a session available
  const session = await req.app.db('sessions').where('user_id', user.id).first();
  if (session) {
    await req.app.db('sessions').where('id', session.id).delete();
  }

  // Generate JWT token and set expiration date for 1 week
  const token = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '1w' });
  // Create session
  await req.app.db('sessions').insert({ user_id: user.id });
  return res.json({ status: 200, token, data: { username: user.username, id: user.id } });
};
