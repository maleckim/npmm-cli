const storage = require("node-persist");
const myStorage = storage.create({ dir: "../data/", ttl: 3000 });
myStorage.init({
  dir: "../data",

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
      return console.log(name);
    })
  },

}
// myStorage.setItem('name', 'matthew');



// const retrieveName = function(){
//   myStorage.getItem('name')
//   .then( name => {
//     return console.log(name);
//   })
// }

module.exports = userService;
