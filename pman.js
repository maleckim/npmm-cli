const { Command } = require("commander");
const exec = require("./lib/execSync");
const fetch = require("node-fetch");
// const { setName, retrieveName, getCollections, readyLaunch } = require("./lib/localPersist");
const npmmAPI = require('./services/npmmAPI')

const npmm = new Command();

function displayCollections(userCollections) {
  for (let i in userCollections) {
    console.log(`${userCollections[i].collection_name}`);
  }
}

// npmm
//   .command("launch <collection_name>")
//   .description("installs your npm packages")
//   .action((collection_name) => {
//     readyLaunch(collection_name);
//     // console.log(exec("ls"));
//   });

npmm
  .command("view")
  .description("view user collections")
  .action(() => {
    npmmAPI.getCollections();
  });

// npmm
//   .command("who")
//   .description("view who is signed on")
//   .action(() => {
//     retrieveName();
//   });

// npmm
//   .command("set-user <email> <password>")
//   .description("set the user email for NPMM")
//   .action((email, password) => {
//     setName(email,password);
//   });

// 113-0668256-0077045
npmm.parse(process.argv);
