const fetch = require("node-fetch");

const apiObject = {
  packageFromCollection(id, auth){
    fetch(`http://localhost:8000/api/collections/${id}?justNames=true`, 
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then(res => res.ok ? res.json() : console.log('trouble'))
    .then(resJSON => console.log(resJSON))
  }
}

module.exports = apiObject;