const { Command } = require('commander');
const exec = require('./lib/exec_sync');
const fetch = require('node-fetch');
const defer = require('lodash.defer');
//creating and checking for persisting data
const name = require('./lib/local_persist');

const npmm = new Command();

let collections = [];

function displayCollections(userCollections){
  for(let i in userCollections){
    console.log(`${userCollections[i].collection_name}`)
  }
}


function listView() {
  fetch(`http://localhost:8000/api/collections?userId=1`)
    .then( res => {
      if(res.ok){
        return res.json()
      }
    })
    .then( resJSON => {
      return displayCollections(resJSON); 
    })

    // console.log(exec('ls'));
}

function viewUser() {
  console.log(name);
}


npmm
  // .option("-v, --view", "View all the user collections", listView)
  // .option("-U, --user", "Sign in for personalized view", signIn)
  .option("-u, --who", "Check current user", viewUser)

npmm
  .command("launch")
  .description("create a package-lock.json")
  .action(() => {
    console.log(exec('ls'));
  });

npmm
  .command("view")
  .description("view user collections")
  .action(() => {
    listView()
  })
  
// 113-0668256-0077045
npmm.parse(process.argv);