/* eslint-disable-next-line no-unused-vars */
const error = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ status: 500 });
};

module.exports = error;
