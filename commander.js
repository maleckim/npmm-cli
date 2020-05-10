const { Command } = require('commander');
const exec = require('./lib/exec_sync');
//creating and checking for persisting data
const name = require('./lib/local_persist');

const program = new Command();

function listView() {
    console.log(exec('ls'));
}

function viewUser() {
  console.log(name);
}

program
  .option("-v, --view", "View all the user collections", listView)
  .option("-u, --user", "Check current user", viewUser)

program
  .command("launch")
  .description("create a package-lock.json")
  .action(() => {
    console.log(exec('ls'));
  });
  
// 113-0668256-0077045
program.parse(process.argv);