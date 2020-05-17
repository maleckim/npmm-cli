const fetch = require("node-fetch");
const {API_ENDPOINT} = require('../config')
const store = require('../lib/localPersist')

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
    .then(res => res.ok ? res.json() : console.log('trouble'))
  },
  getCollections: async () => {
    const token = await store.getToken();
    return fetch(`${API_ENDPOINT}/api/collections`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    .then((res) => res.json())
  }
}

module.exports = npmmAPI;