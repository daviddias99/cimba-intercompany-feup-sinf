const { makeRequest } = require('../jasmin/makeRequest');

exports.allItemMaps = async (req, res) => {
  // extract all item maps
  const itemMaps = await req.app.db('item_maps').where({ ic_id: req.params.id }).select(['id', 'ic_id', 'jasmin_id', 'item_id', 'map_ic_id', 'item_quant']);

  // for each one, extract info from local company
  for (let i = 0; i < itemMaps.length; i += 1) {
    const entry = itemMaps[i];
    // eslint-disable-next-line no-await-in-loop
    const itemInLocalCompany = await makeRequest(`businessCore/items/${entry.jasmin_id}`, 'get', req.params.id, null, null);
    if (itemInLocalCompany.status === 200) {
      itemMaps[i] = {
        ...entry,
        local_unit: itemInLocalCompany.data.baseUnit,
        local_description: itemInLocalCompany.data.description,
      };
    } else {
      return res.status(400).json('Could not extract information for one or more items.');
    }
  }

  // for each one, extract info from other company
  for (let i = 0; i < itemMaps.length; i += 1) {
    const entry = itemMaps[i];
    // eslint-disable-next-line no-await-in-loop
    const itemInOtherCompany = await makeRequest(`businessCore/items/${entry.item_id}`, 'get', entry.map_ic_id, null, null);
    if (itemInOtherCompany.status === 200) {
      itemMaps[i] = {
        ...entry,
        unit: itemInOtherCompany.data.baseUnit,
        description: itemInOtherCompany.data.description,
      };
    } else {
      return res.status(400).json('Could not extract information for one or more items.');
    }
  }

  return res.json(itemMaps);
};

exports.newItemMap = async (req, res) => {
  // check if mapping is between the same company
  if (req.params.id === req.body.map_ic_id) {
    return res.status(400).json('Cannot create a mapping to the same company!');
  }

  // check if map_ic_id is a valid integer
  if (!(!Number.isNaN(req.body.map_ic_id) && Number.isInteger(parseFloat(req.body.map_ic_id)))) {
    return res.status(400).json('Company ID is not a valid number!');
  }

  // check if item_quant is a valid input
  if (!(!Number.isNaN(req.body.item_quant) && /^\d+(\.\d{1,2})?$/.test(req.body.item_quant))) {
    return res.status(400).json('The input for item quantity is invalid!');
  }
  const itemQuantLocal = parseFloat(req.body.item_quant);
  if (itemQuantLocal <= 0) {
    return res.status(400).json('The input for item quantity is invalid!');
  }

  // check if company mapping exists
  const companyMapping = await req.app.db('company_maps').where({ ic_id: req.params.id, map_ic_id: req.body.map_ic_id });
  if (!companyMapping.length) {
    return res.status(400).json('There is no mapping between these two companies! Please create a company mapping.');
  }

  // check if mapping already exists
  const itemMapping = await req.app.db('item_maps').where({ ic_id: req.params.id, map_ic_id: req.body.map_ic_id, item_id: req.body.item_id });
  if (itemMapping.length) {
    return res.status(400).json('There is already a mapping for this item between these two companies!');
  }

  // check if Jasmin ID already exists for that company
  const mapsForTheSameLocalID = await req.app.db('item_maps').where({ ic_id: req.params.id, jasmin_id: req.body.jasmin_id });
  if (mapsForTheSameLocalID.length) {
    return res.status(400).json(`There is already an item mapping for Jasmin ID ${req.body.jasmin_id} in this company!`);
  }

  // check if item with ID jasmin_id exists on the local company
  const itemInLocalCompany = await makeRequest(`businessCore/items/${req.body.jasmin_id}`, 'get', req.params.id, null, null);
  if (itemInLocalCompany.status !== 200) {
    return res.status(400).json(`Item with ID ${req.body.jasmin_id} does not exist in this company!`);
  }

  // check if item with ID item_id exists on the other company
  const itemInOtherCompany = await makeRequest(`businessCore/items/${req.body.item_id}`, 'get', req.body.map_ic_id, null, null);
  if (itemInOtherCompany.status !== 200) {
    return res.status(400).json(`Item with ID ${req.body.item_id} does not exist in the other company!`);
  }

  const itemQuantOther = +((1 / itemQuantLocal).toFixed(2));

  // create new item mappings
  try {
    // create mapping for the other company
    await req.app.db('item_maps').insert([{
      ic_id: req.body.map_ic_id,
      jasmin_id: req.body.item_id,
      item_id: req.body.jasmin_id,
      map_ic_id: req.params.id,
      item_quant: itemQuantOther,
    }]);

    // create mapping for this company
    const itemMap = await req.app.db('item_maps').insert([{
      ic_id: req.params.id,
      jasmin_id: req.body.jasmin_id,
      item_id: req.body.item_id,
      map_ic_id: req.body.map_ic_id,
      item_quant: itemQuantLocal,
    }], ['id', 'ic_id', 'jasmin_id', 'item_id', 'map_ic_id']);

    return res.status(201).json(itemMap);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.deleteItemMap = async (req, res) => {
  await req.app.db('item_maps').where({ map_ic_id: req.params.id, item_id: req.params.jasmin_id }).delete();
  await req.app.db('item_maps').where({ ic_id: req.params.id, jasmin_id: req.params.jasmin_id }).delete();
  return res.status(200).json('Item map has been deleted');
};
