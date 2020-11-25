exports.allItemMaps = async (req, res) => {
  const companyMaps = await req.app.db('item_maps').where({ company_id: req.params.id }).select(['id', 'company_id', 'local_id', 'item_id']);
  return res.json(companyMaps);
};

exports.newItemMap = async (req, res) => {
  const mapsForTheSameLocalID = await req.app.db('item_maps').where({ company_id: req.params.id, local_id: req.body.local_id });

  if (mapsForTheSameLocalID.length) {
    return res.status(400).json(`There is already a map for local_id ${req.body.local_id} in company ${req.params.id}!`);
  }

  const companyMap = await req.app.db('item_maps').insert([{
    company_id: req.params.id,
    local_id: req.body.local_id,
    item_id: req.body.item_id,
  }], ['id', 'company_id', 'local_id', 'item_id']);
  return res.status(201).json(companyMap);
};
