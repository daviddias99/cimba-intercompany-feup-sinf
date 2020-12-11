module.exports = {
  additionalProperties: false,
  required: ['company_key', 'ic_id'],
  properties: {
    company_key: {
      type: 'string',
    },
    ic_id: {
      type: 'string',
    },
  },
};
