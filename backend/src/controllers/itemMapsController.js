const db = require('../../database/knex');

exports.all_item_maps = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json('Expected to have the id as Paramenter for getting a Company\'s ItemMaps!').send();
      return;
    }

    const companyMaps = await db('item_maps').where({ company_id: req.params.id }).select(['id', 'company_id', 'local_id', 'item_id']);
    res.send(companyMaps);
  } catch (err) {
    console.log('Failed to establish connection to database! Exiting...');
    console.log(err);
    process.exit(1);
  }
};

exports.new_item_map = async (req, res) => {
  try {
    if (!req.body.item_id || !req.body.local_id) {
      res.status(400).json('Expected to have the item_id and local_id as Arguments for Creating a Company\'s Item Map!').send();
      return;
    }

    if (!req.params.id) {
      res.status(400).json('Expected to have the id as Paramenter for creating a map for a Company\'s!').send();
      return;
    }

    const mapsForTheSameLocalID = await db('item_maps').where({ company_id: req.params.id, local_id: req.body.local_id });

    if (mapsForTheSameLocalID.length) {
      res.status(400).json(`There is already a map for local_id ${req.body.local_id} in company ${req.params.id}!`).send();
      return;
    }

    const companyMap = await db('item_maps').insert([{
      company_id: req.params.id,
      local_id: req.body.local_id,
      item_id: req.body.item_id,
    }], ['id', 'company_id', 'local_id', 'item_id']);
    res.send(companyMap);
  } catch (err) {
    console.log('Failed to establish connection to database! Exiting...');
    console.log(err);
    process.exit(1);
  }
};

exports.company_by_id = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json('Expected to have the id as Paramenter for getting a Company!').send();
      return;
    }

    const user = await db('companies').where({ id: req.params.id }).first(['id', 'company_key', 'app_id', 'tenant', 'organization']);
    if (!user) {
      res.status(404).json(`Company with ID ${req.params.id} not found!`).send();
      return;
    }
    res.send(user);
  } catch (err) {
    console.log('Failed to establish connection to database! Exiting...');
    console.log(err);
    process.exit(1);
  }
};
