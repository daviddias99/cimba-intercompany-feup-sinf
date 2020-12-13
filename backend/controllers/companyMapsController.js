const { makeRequest } = require('../jasmin/makeRequest');

exports.allCompanyMaps = async (req, res) => {
  let companyMaps = null;
  if (req.query.map_ic_id) {
    companyMaps = await req.app.db('company_maps').where({ ic_id: req.params.id, map_ic_id: req.query.map_ic_id }).first().select(['id', 'ic_id', 'jasmin_id', 'map_ic_id']);
  } else {
    companyMaps = await req.app.db('company_maps').where({ ic_id: req.params.id }).select(['id', 'ic_id', 'jasmin_id', 'map_ic_id']);
  }

  return companyMaps != null ? res.json(companyMaps) : null;
};

exports.newCompanyMap = async (req, res) => {
  // check if mapping is between the same company
  if (req.params.id === req.body.map_ic_id) {
    return res.status(400).json('Cannot create a mapping to the same company!');
  }

  // check if map_ic_id is a valid integer
  if (!(!Number.isNaN(req.body.map_ic_id) && Number.isInteger(parseFloat(req.body.map_ic_id)))) {
    return res.status(400).json('Company ID is not a valid number!');
  }

  // check if company exists
  const ownerCompany = await req.app.db('companies').where({ id: req.params.id }).first();
  if (!ownerCompany) {
    return res.status(400).json(`Company with ID (${req.params.id}) does not exist!`);
  }

  // check if other company exists in IC DB
  const mapCompanyInIC = await req.app.db('companies').where({ id: req.body.map_ic_id }).first();
  if (!mapCompanyInIC) {
    return res.status(400).json('There is no registered company with those IDs!');
  }

  // check if other company exists in Jasmin in the same party
  const mapCompanyInJasmin = await makeRequest(`businessCore/parties/${req.body.jasmin_id}`, 'get', req.params.id, null, null);
  if (mapCompanyInJasmin.status !== 200) {
    return res.status(400).json('There is no registered company with those IDs!');
  }

  // check if mapping already exists
  const mapForSameCompanies = await req.app.db('company_maps').where({ ic_id: req.params.id, map_ic_id: req.body.map_ic_id });
  if (mapForSameCompanies.length) {
    return res.status(400).json('There is already a mapping between these two companies!');
  }

  // check if Jasmin ID already exists for that company
  const mapsForTheSameJasminID = await req.app.db('company_maps').where({ ic_id: req.params.id, jasmin_id: req.body.jasmin_id });
  if (mapsForTheSameJasminID.length) {
    return res.status(400).json(`There is already a company mapping for Jasmin ID ${req.body.jasmin_id} in this company!`);
  }

  // create company mappings
  try {
    // create new company mapping for this company
    const companyMap = await req.app.db('company_maps').insert([{
      ic_id: req.params.id,
      jasmin_id: req.body.jasmin_id,
      map_ic_id: req.body.map_ic_id,
    }], ['id', 'ic_id', 'jasmin_id', 'map_ic_id']);
    return res.status(201).json(companyMap);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.deleteCompanyMap = async (req, res) => {
  await req.app.db('company_maps').where({ ic_id: req.params.id, jasmin_id: req.params.jasmin_id }).delete();
  return res.status(200).json('Company map has been deleted');
};
