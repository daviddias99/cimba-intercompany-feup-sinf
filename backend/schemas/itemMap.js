module.exports = {
  additionalProperties: false,
  required: ['item_id', 'local_id', 'map_company_id'],
  properties: {
    item_id: {
      type: 'string',
    },
    local_id: {
      type: 'string',
    },
    map_company_id: {
      type: 'string',
    },
  },
};
