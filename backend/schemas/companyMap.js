module.exports = {
  additionalProperties: false,
  required: ['jasmin_id', 'map_ic_id'],
  properties: {
    jasmin_id: {
      type: 'string',
    },
    map_ic_id: {
      type: 'string',
    },
  },
};
