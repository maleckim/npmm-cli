const { Command } = require("commander");
const exec = require("./lib/exec_sync");
const fetch = require("node-fetch");
const { setName, retrieveName, getCollections } = require("./lib/local_persist");

const npmm = new Command();

function displayCollections(userCollections) {
  for (let i in userCollections) {
    console.log(`${userCollections[i].collection_name}`);
  }
}


function listView() {


  // console.log(exec('ls'));
}


npmm
  .command("launch")
  .description("installs your npm packages")
  .action(() => {
    console.log(exec("ls"));
  });

npmm
  .command("view")
  .description("view user collections")
  .action(() => {
     getCollections();
  });

npmm
  .command("who")
  .description("view who is signed on")
  .action(() => {
    retrieveName();
  });

npmm
  .command("set-user <email> <password>")
  .description("set the user email for NPMM")
  .action((email, password) => {
    console.log(password);
    setName(email,password);
  });

// 113-0668256-0077045
npmm.parse(process.argv);
