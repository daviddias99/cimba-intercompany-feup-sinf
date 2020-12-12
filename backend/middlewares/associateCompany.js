const associateCompany = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ status: 401 });
    }

    const company = await req.app.db('companies').where('companies.id', req.user.ic_id).first();

    if (!company) {
      return res.status(400).json({ status: 400, reason: 'user is not associated with any company' });
    }
    req.company = company;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 500 });
  }
};

module.exports = associateCompany;
