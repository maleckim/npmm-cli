const storage = require("node-persist");
const fetch = require("node-fetch");
const npmmAPI = require("../services/npmmAPI");
const install = require("./execSync");
const {API_ENDPOINT} = require('../config')

// const myStorage = storage.create({ dir: "../data/", ttl: 3000 });
const myStorage = storage.create({ dir: "./mystore", ttl: 3000 });

myStorage.init({
  dir: "./mystore",

  stringify: JSON.stringify,

  parse: JSON.parse,

  encoding: "utf8",

  logging: false, // can also be custom logging function

  ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS or a valid Javascript Date object

  expiredInterval: 2 * 60 * 1000, // every 2 minutes the process will clean-up the expired cache

  // in some cases, you (or some other service) might add non-valid storage files to your
  // storage dir, i.e. Google Drive, make this true if you'd like to ignore these files and not throw an error
  forgiveParseErrors: false,
});



const store = {
  setEmail(email) {
    return myStorage.setItem("email", email);
  },
  getEmail() {
    return myStorage.getItem("email");
  },
  setToken(token) {
   return myStorage.setItem("token", token);
  },
  getToken: () => {
    return myStorage.getItem("bearer");
  },
}

const userService = {
  setName(userEmail, password) {
    myStorage.setItem("email", userEmail);
    // myStorage.setItem("password", password);
    let login = { email: userEmail, password: password };

    console.log(`user email now set as ${userEmail}`);

    return fetch(`${API_ENDPOINT}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((res) => {
        return res.json();
      })
      .then((resJSON) => {
        myStorage.setItem("bearer", resJSON["authToken"]);
        return resJSON;
      });
  },

  retrieveName() {
    myStorage.getItem("email").then((name) => {
      console.log(name);
      return name;
    });
  },

  getCollections() {
    let bearer;
    myStorage.getItem("bearer").then((token) => {
      return fetch(`${API_ENDPOINT}/api/collections`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((resJSON) => {
          resJSON.map((collections) => {
            console.log(collections.collection_name.replace(' ', '-'));
          });
          return resJSON;
        });
    });
  },

  readyLaunch(collectionName){

    let namesArray = function(data){
      let launchString = 'npm i ';

      for(let i in data){
        launchString = launchString.concat(data[i].name + ' ')
      }
      console.log(launchString);
      install(launchString);
    }


    myStorage.getItem('bearer').then(token => {
      if(!token){
        console.log('not authorized please sign in using the set-user command view --help for more options')
      }else{
        myStorage.getItem(collectionName).then(id => {
          npmmAPI.packageFromCollection(id, token, namesArray)
        })
      }
    })
    myStorage.getItem(collectionName).then(id => console.log(id))
  }
};

module.exports = store;
