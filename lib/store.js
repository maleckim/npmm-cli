const storage = require('node-persist');

const myStorage = storage.create({ dir: `${__dirname}/data`, ttl: 3000 });

myStorage.init({
  dir: `${__dirname}/data`,
  stringify: JSON.stringify,
  parse: JSON.parse,
  encoding: 'utf8',
  logging: false,
  ttl: false,
  expiredInterval: 2 * 60 * 1000,
  forgiveParseErrors: false,
});

const store = {
  setEmail(email) {
    return myStorage.setItem('email', email);
  },
  getEmail() {
    return myStorage.getItem('email');
  },
  setToken(token) {
    return myStorage.setItem('token', token);
  },
  getToken: () => myStorage.getItem('token'),
};

module.exports = store;
