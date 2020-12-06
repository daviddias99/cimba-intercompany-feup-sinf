const db = require('../knex');

exports.getCompanyById = async (companyId) => db('companies').where({ id: companyId }).first();

exports.getCompanyByKey = async (companyKey) => db('companies').where({ company_key: companyKey }).first();

exports.getCompanies = async () => db('companies').select();
