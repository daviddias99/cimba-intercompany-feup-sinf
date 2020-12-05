module.exports = {
  properties: {
    username: {
      type: 'string',
      maxLength: 10,
      minLength: 3,
    },

    password: {
      type: 'string',
    },
  },
  additionalProperties: false,
  required: ['username', 'password'],
};
