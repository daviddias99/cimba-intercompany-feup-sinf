const { makeRequest } = require('../jasmin/makeRequest');

exports.allItemMaps = async (req, res) => {
  // extract all item maps
  const itemMaps = await req.app.db('item_maps').where({ company_id: req.params.id }).select(['id', 'company_id', 'local_id', 'item_id', 'map_company_id']);
  
  // for each one, extract info from local company
  for (let i = 0; i < itemMaps.length; i++) {
    let entry = itemMaps[i];
    const itemInLocalCompany = await makeRequest(`businessCore/items/${entry.local_id}`, 'get', req.params.id, null, null)
    if (itemInLocalCompany.status === 200) {
      itemMaps[i] = {
        ...entry,
        local_unit: itemInLocalCompany.data.baseUnit,
        local_description: itemInLocalCompany.data.description,
      }
    }
    else {
      return res.status(400).json(`Could not extract information for one or more items.`);
    }
  }

  // for each one, extract info from other company
  for (let i = 0; i < itemMaps.length; i++) {
    let entry = itemMaps[i];
    const itemInOtherCompany = await makeRequest(`businessCore/items/${entry.item_id}`, 'get', entry.map_company_id, null, null)
    if (itemInOtherCompany.status === 200) {
      itemMaps[i] = {
        ...entry,
        unit: itemInOtherCompany.data.baseUnit,
        description: itemInOtherCompany.data.description,
      }
    }
    else {
      return res.status(400).json(`Could not extract information for one or more items.`);
    }
  }

  return res.json(itemMaps);
};

exports.newItemMap = async (req, res) => {
  // check if mapping is between the same company
  if (req.params.id === req.body.map_company_id) {
    return res.status(400).json(`Cannot create a mapping to the same company!`);
  }

  // check if map_company_id is a valid integer
  if (!(!isNaN(req.body.map_company_id) && Number.isInteger(parseFloat(req.body.map_company_id)))) {
    return res.status(400).json(`Company ID is not a valid number!`);
  }

  // check if company mapping exists
  const companyMapping = await req.app.db('item_maps').where({ company_id: req.params.id, map_company_id: req.body.map_company_id });
  if (!companyMapping.length) {
    return res.status(400).json(`There is no mapping between these two companies! Please create a company mapping.`);
  }

  // check if mapping already exists
  const itemMapping = await req.app.db('item_maps').where({ company_id: req.params.id, map_company_id: req.body.map_company_id, item_id: req.body.item_id });
  if (itemMapping.length) {
    return res.status(400).json(`There is already a mapping for this item between these two companies!`);
  }

  // check if local ID already exists for that company
  const mapsForTheSameLocalID = await req.app.db('item_maps').where({ company_id: req.params.id, local_id: req.body.local_id });
  if (mapsForTheSameLocalID.length) {
    return res.status(400).json(`There is already an item mapping for local ID ${req.body.local_id} in this company!`);
  }

  // check if item with ID local_id exists on the local company
  const itemInLocalCompany = await makeRequest(`businessCore/items/${req.body.local_id}`, 'get', req.params.id, null, null)
  if (itemInLocalCompany.status !== 200) {
    return res.status(400).json(`Item with ID ${req.body.local_id} does not exist in this company!`);
  }

  // check if item with ID item_id exists on the other company
  const itemInOtherCompany = await makeRequest(`businessCore/items/${req.body.item_id}`, 'get', req.body.map_company_id, null, null)
  if (itemInOtherCompany.status !== 200) {
    return res.status(400).json(`Item with ID ${req.body.item_id} does not exist in the other company!`);
  }

  // create new item mappings
  try {
    // create mapping for the other company
    await req.app.db('item_maps').insert([{
      company_id: req.body.map_company_id,
      local_id: req.body.item_id,
      item_id: req.body.local_id,
      map_company_id: req.params.id,
    }]);

    // create mapping for this company
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
  await req.app.db('item_maps').where({ map_company_id: req.params.id, item_id: req.params.local_id}).delete();
  await req.app.db('item_maps').where({ company_id: req.params.id, local_id: req.params.local_id}).delete();
  return res.status(200).json(`Item map has been deleted`);
}