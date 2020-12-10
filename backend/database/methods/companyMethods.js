const db = require('../knex');

exports.getCompanyById = async (icId) => db('companies').where({ id: icId }).first();

exports.getCompanies = async () => db('companies').select();
