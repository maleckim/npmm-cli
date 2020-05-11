const { Command } = require("commander");
const exec = require("./lib/exec_sync");
const fetch = require("node-fetch");
const { setName, retrieveName } = require("./lib/local_persist");

const npmm = new Command();

function displayCollections(userCollections) {
  for (let i in userCollections) {
    console.log(`${userCollections[i].collection_name}`);
  }
}




function listView() {
 
  fetch(`http://localhost:8000/api/cli?email=${email}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((resJSON) => {
      console.log(resJSON);
      // return displayCollections(resJSON);
    });

  // console.log(exec('ls'));
}


npmm
  .command("launch")
  .description("create a package-lock.json")
  .action(() => {
    console.log(exec("ls"));
  });

npmm
  .command("view")
  .description("view user collections")
  .action(() => {
    listView();
  });

npmm
  .command("who")
  .description("view who is signed on")
  .action(() => {
    retrieveName();
  });

npmm
  .command("set-user <email>")
  .description("set the user email for NPMM")
  .action((email) => {
    setName(email);
  });

// 113-0668256-0077045
npmm.parse(process.argv);
