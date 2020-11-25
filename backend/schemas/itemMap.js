module.exports = {
  additionalProperties: false,
  required: ['item_id', 'local_id'],
  properties: {
    item_id: {
      type: 'string',
    },
    local_id: {
      type: 'string',
    },
  },
};
