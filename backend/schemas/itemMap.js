module.exports = {
  additionalProperties: false,
  required: ['jasmin_id', 'map_ic_id', 'item_id'],
  properties: {
    jasmin_id: {
      type: 'string',
    },
    map_ic_id: {
      type: 'string',
    },
    item_id: {
      type: 'string',
    },
    item_quant: {
      type: 'string',
    },
  },
};
