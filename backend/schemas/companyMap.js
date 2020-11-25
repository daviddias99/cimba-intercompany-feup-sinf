module.exports = {
  additionalProperties: false,
  required: ['company_key', 'local_id'],
  properties: {
    company_key: {
      type: 'string',
    },
    local_id: {
      type: 'string',
    },
  },
};
