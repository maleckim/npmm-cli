const fetch = require("node-fetch");
const {API_ENDPOINT} = require('../config')
const store = require('../lib/localPersist')

const npmmAPI = {
  packageFromCollection(id, auth, callback){
    fetch(`${API_ENDPOINT}/api/collections/${id}?justNames=true`, 
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then(res => res.ok ? res.json() : console.log('trouble'))
    .then(resJSON => callback(resJSON))
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