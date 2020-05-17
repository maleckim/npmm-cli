const fetch = require("node-fetch");
const {API_ENDPOINT} = require('../config')

const apiObject = {
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
  }
}

module.exports = apiObject;