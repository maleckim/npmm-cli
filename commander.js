const { Command } = require('commander');
const exec = require('./lib/exec_sync');
//creating and checking for persisting data
const name = require('./lib/local_persist');

const program = new Command();

function listView() {
    console.log(name);
    console.log(exec('ls'));
}

program
  .option("-l, --list", "thing doing the thing woo", listView)

program
  .command("view")
  .description("view a list of current collections")
  .action(() => {
    console.log(`Here is your current collections`) 
  });
  
// 113-0668256-0077045
program.parse(process.argv);