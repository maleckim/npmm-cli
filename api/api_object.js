const fetch = require("node-fetch");

const apiObject = {

  retrieveUserId(email){
    fetch(`http://localhost:8000/api/cli?email=${email}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((resJSON) => {
      return resJSON;
    });
  }

}

module.exports = apiObject;