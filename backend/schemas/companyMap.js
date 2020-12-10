module.exports = {
  additionalProperties: false,
  required: ['map_company_id', 'local_id'],
  properties: {
    map_company_id: {
      type: 'string',
    },
    local_id: {
      type: 'string',
    },
  },
};
