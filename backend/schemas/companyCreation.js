module.exports = {
  additionalProperties: false,
  required: ['company_key', 'app_id', 'app_secret', 'tenant', 'organization'],
  properties: {
    id: {
      type: 'integer',
    },
    company_key: {
      type: 'string',
      minLength: 1,
    },
    app_id: {
      type: 'string',
      minLength: 1,
    },
    app_secret: {
      type: 'string',
      minLength: 1,
    },
    tenant: {
      type: 'string',
      minLength: 1,
    },
    organization: {
      type: 'string',
      minLength: 1,
    },
  },
};
