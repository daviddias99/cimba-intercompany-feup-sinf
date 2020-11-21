exports.all_company_maps = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json('Expected to have the id as Paramenter for getting a Company\'s CompanyMaps!').send();
      return;
    }

    const companyMaps = await req.app.db('company_maps').where({ company_id: req.params.id }).select(['id', 'company_id', 'local_id', 'company_key']);
    res.send(companyMaps);
  } catch (err) {
    console.log('DataBase Error...');
    console.log(err);
  }
};

exports.new_company_map = async (req, res) => {
  try {
    if (!req.body.company_key || !req.body.local_id) {
      res.status(400).json('Expected to have the company_key and local_id as Arguments for Creating a Company\'s CompanyMap!').send();
      return;
    }

    const ownerCompany = await req.app.db('companies').where({ id: req.params.id }).first();

    if (ownerCompany.company_key === req.body.company_key) {
      res.status(400).json(`Owner's Company ID should be different from CompanyMaps Company Key (${req.body.company_key})!`).send();
      return;
    }

    const mapsForTheSameLocalID = await req.app.db('company_maps').where({ company_id: req.params.id, local_id: req.body.local_id });

    if (mapsForTheSameLocalID.length) {
      res.status(400).json(`There is already a map for local_id ${req.body.local_id} in company ${req.params.id}!`).send();
      return;
    }

    const companyMap = await req.app.db('company_maps').insert([{
      company_id: req.params.id,
      local_id: req.body.local_id,
      company_key: req.body.company_key,
    }], ['id', 'company_id', 'local_id', 'company_key']);
    res.status(201).send(companyMap);
  } catch (err) {
    console.log('DataBase Error...');
    console.log(err);
  }
};
