const db = require('../knex');

exports.getCompanyById = async (companyId) => db('companies').where({ id: companyId }).first();
