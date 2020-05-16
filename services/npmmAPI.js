const fetch = require("node-fetch");

const apiObject = {
  packageFromCollection(id, auth, callback){
    fetch(`http://localhost:8000/api/collections/${id}?justNames=true`, 
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