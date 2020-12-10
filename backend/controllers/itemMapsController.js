exports.allItemMaps = async (req, res) => {
  const itemMaps = await req.app.db('item_maps').where({ company_id: req.params.id }).select(['id', 'company_id', 'local_id', 'item_id', 'map_company_id']);
  return res.json(itemMaps);
};

exports.newItemMap = async (req, res) => {
  // check if mapping is between the same company
  if (req.params.id === req.body.map_company_id) {
    return res.status(400).json(`Cannot create a mapping to the same company!`);
  }

  // check if company mapping exists
  const companyMapping = await req.app.db('company_maps').where({ company_id: req.params.id, map_company_id: req.body.map_company_id });
  if (!companyMapping.length) {
    return res.status(400).json(`There is no mapping between these two companies! Please create a company mapping.`);
  }

  // check if mapping already exists
  const itemMapping = await req.app.db('company_maps').where({ company_id: req.params.id, map_company_id: req.body.map_company_id, item_id: req.body.item_id });
  if (itemMapping.length) {
    return res.status(400).json(`There is already a mapping for this item between these two companies!`);
  }

  // check if local ID already exists for that company
  const mapsForTheSameLocalID = await req.app.db('item_maps').where({ company_id: req.params.id, local_id: req.body.local_id });
  if (mapsForTheSameLocalID.length) {
    return res.status(400).json(`There is already an item mapping for local_id ${req.body.local_id} in this company!`);
  }

  // create new item mapping
  try {
    const itemMap = await req.app.db('item_maps').insert([{
      company_id: req.params.id,
      local_id: req.body.local_id,
      item_id: req.body.item_id,
      map_company_id: req.body.map_company_id,
    }], ['id', 'company_id', 'local_id', 'item_id', 'map_company_id']);
    return res.status(201).json(itemMap);
  }
  catch (error) {
    return res.status(400).json(error);
  }
}

exports.deleteItemMap = async (req, res) => {
  await req.app.db('item_maps').where({ company_id: req.params.id, local_id: req.params.local_id}).delete();
  return res.status(200).json(`Item map has been deleted`);
}