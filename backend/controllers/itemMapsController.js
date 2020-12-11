exports.allItemMaps = async (req, res) => {
  const companyMaps = await req.app.db('item_maps').where({ ic_id: req.params.id }).select(['id', 'ic_id', 'jasmin_id', 'item_id']);
  return res.json(companyMaps);
};

exports.newItemMap = async (req, res) => {
  const mapsForTheSameLocalID = await req.app.db('item_maps').where({ ic_id: req.params.id, jasmin_id: req.body.jasmin_id });

  if (mapsForTheSameLocalID.length) {
    return res.status(400).json(`There is already a map for jasmin ID ${req.body.jasmin_id} in company ${req.params.id}!`);
  }

  const companyMap = await req.app.db('item_maps').insert([{
    ic_id: req.params.id,
    jasmin_id: req.body.jasmin_id,
    item_id: req.body.item_id,
    map_ic_id: req.body.map_ic_id,
  }], ['id', 'ic_id', 'jasmin_id', 'item_id', 'map_ic_id']);
  return res.status(201).json(companyMap);
};
