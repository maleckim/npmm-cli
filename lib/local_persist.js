const storage = require("node-persist");
const apiObject = require("../api/api_object")
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


const userService = {

  setName(userEmail){
    myStorage.setItem('email', `${userEmail}`);
    console.log(`user email now set as ${userEmail}`);
  },

  retrieveName(){
    myStorage.getItem('email')
    .then( name => {
      console.log(name);
      return name;
    })
  },

}

module.exports = userService;
