exports.allCompanyMaps = async (req, res) => {
  const companyMaps = await req.app.db('company_maps').where({ ic_id: req.params.id }).select(['id', 'ic_id', 'jasmin_id', 'map_ic_id']);
  return res.json(companyMaps);
};

exports.newCompanyMap = async (req, res) => {
  const ownerCompany = await req.app.db('companies').where({ id: req.params.id }).first();

  if (ownerCompany.map_ic_id === req.body.map_ic_id) {
    return res.status(400).json(`Owner's Company ID should be different from mapped IC ID(${req.body.map_ic_id})!`);
  }

  const mapsForTheSameLocalID = await req.app.db('company_maps').where({ ic_id: req.params.id, jasmin_id: req.body.jasmin_id });

  if (mapsForTheSameLocalID.length) {
    return res.status(400).json(`There is already a map for jasmin_id ${req.body.jasmin_id} in company ${req.params.id} !`);
  }

  const companyMap = await req.app.db('company_maps').insert([{
    ic_id: req.params.id,
    jasmin_id: req.body.jasmin_id,
    map_ic_id: req.body.map_ic_id,
  }], ['id', 'ic_id', 'jasmin_id', 'map_ic_id']);
  return res.status(201).json(companyMap);
};
