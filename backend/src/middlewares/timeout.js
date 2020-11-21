const timeout = (value) => (req, res, next) => {
  res.setTimeout(value, () => {
    const err = new Error('Gateway timeout');
    err.status = 504;
    next(err);
  });
  next();
};

module.exports = timeout;
