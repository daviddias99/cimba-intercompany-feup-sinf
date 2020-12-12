const { getLogs } = require('../database/methods/logsMethods');
const regexNum = require('../helper/regexNum');

exports.getLogs = async (req, res) => {
  let { page, pageSize } = req.query;

  const regex = new RegExp(regexNum);

  if (page && pageSize) {
    if (!(regex.test(page) && regex.test(pageSize))) {
      res.status(400).json({ status: 400 });
      return;
    }
    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);
  } else {
    page = null;
    pageSize = null;
  }

  const logs = await getLogs(req.company.id, page, pageSize);

  res.json(logs);
};
