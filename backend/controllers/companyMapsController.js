exports.allCompanyMaps = async (req, res) => {
  let companyMaps = null
  if (req.query.map_company_id) {
    companyMaps = await req.app.db('company_maps').where({ company_id: req.params.id, map_company_id: req.query.map_company_id }).first().select(['id', 'company_id', 'local_id', 'map_company_id']);
  }
  else {
    companyMaps = await req.app.db('company_maps').where({ company_id: req.params.id }).select(['id', 'company_id', 'local_id', 'map_company_id']);
  }

  return companyMaps != null ? res.json(companyMaps) : null
};

exports.newCompanyMap = async (req, res) => {
  // check if mapping is between the same company
  if (req.params.id === req.body.map_company_id) {
    return res.status(400).json(`Cannot create a mapping to the same company!`);
  }

  // check if map_company_id is a valid integer
  if (!(!isNaN(req.body.map_company_id) && Number.isInteger(parseFloat(req.body.map_company_id)))) {
    return res.status(400).json(`Company ID is not a valid number!`);
  }

  // check if company exists
  const ownerCompany = await req.app.db('companies').where({ id: req.params.id }).first();
  if (!ownerCompany) {
    return res.status(400).json(`Company with ID (${req.params.id}) does not exist!`);
  }

  // check if other company exists
  const mapCompany = await req.app.db('companies').where({ id: req.body.map_company_id, company_key: req.body.local_id }).first();
  if (!mapCompany) {
    return res.status(400).json(`There is no registered company with those IDs!`);
  }

  // check if mapping already exists
  const mapForSameCompanies = await req.app.db('company_maps').where({ company_id: req.params.id, map_company_id: req.body.map_company_id });
  if (mapForSameCompanies.length) {
    return res.status(400).json(`There is already a mapping between these two companies!`);
  }

  // check if local ID already exists for that company
  const mapsForTheSameLocalID = await req.app.db('company_maps').where({ company_id: req.params.id, local_id: req.body.local_id });
  if (mapsForTheSameLocalID.length) {
    return res.status(400).json(`There is already a company mapping for Local ID ${req.body.local_id} in this company!`);
  }

  // create company mappings
  try {
    // create new company mapping for this company
    const companyMap = await req.app.db('company_maps').insert([{
      company_id: req.params.id,
      local_id: req.body.local_id,
      map_company_id: req.body.map_company_id,
    }], ['id', 'company_id', 'local_id', 'map_company_id']);
    return res.status(201).json(companyMap);
  }
  catch (error) {
    return res.status(400).json(error);
  }
}

exports.deleteCompanyMap = async (req, res) => {
  await req.app.db('company_maps').where({ company_id: req.params.id, local_id: req.params.local_id }).delete();
  return res.status(200).json(`Company map has been deleted`);
}