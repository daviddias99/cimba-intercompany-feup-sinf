module.exports = {
  additionalProperties: false,
  required: ['company_key', 'app_id', 'app_secret', 'tenant', 'organization'],
  properties: {
    company_key: {
      type: 'string',
    },
    app_id: {
      type: 'string',
    },
    app_secret: {
      type: 'string',
    },
    tenant: {
      type: 'string',
    },
    organization: {
      type: 'string',
    },
  },
};
