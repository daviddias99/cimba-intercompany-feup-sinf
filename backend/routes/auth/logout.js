const express = require('express');

const router = express.Router();

router.post('/',
  async (req, res) => {
    const { user } = req;
    // Check if user exists
    if (!user) {
      return res.json({ status: 404, message: 'Data does not match our logs' });
    }

    // Destroy session / Revoke token
    await req.app.db('sessions').where('user_id', user.id).delete();
    return res.json({ status: 200 });
  });

module.exports = router;
