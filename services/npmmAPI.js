const fetch = require('node-fetch');
const { API_ENDPOINT } = require('../config');
const store = require('../lib/localPersist');

const npmmAPI = {
  getPackages: async (id) => {
    const token = await store.getToken();
    return fetch(`${API_ENDPOINT}/api/collections/${id}?justNames=true`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => (res.ok ? res.json() : console.log('There was an issue...')));
  },
  getCollections: async () => {
    const token = await store.getToken();
    return fetch(`${API_ENDPOINT}/api/collections`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json());
  },
  login: (email, password) => fetch(`${API_ENDPOINT}/api/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((res) => store.setToken(res.authToken))
    .then(store.setEmail(email)),
};

module.exports = npmmAPI;
