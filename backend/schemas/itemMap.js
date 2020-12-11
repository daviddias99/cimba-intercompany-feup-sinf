module.exports = {
  additionalProperties: false,
  required: ['item_id', 'ic_id'],
  properties: {
    item_id: {
      type: 'string',
    },
    ic_id: {
      type: 'string',
    },
  },
};
