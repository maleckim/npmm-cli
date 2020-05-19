const { Command } = require('commander');
const { execSync } = require('child_process');
const prompts = require('prompts');
const npmmAPI = require('./services/npmmAPI');
const store = require('./lib/store');
const { prepareInstallCommand, packagesInCollection } = require('./lib/helper');

const npmm = new Command();

npmm
  .command('launch <collection_name>')
  .description('installs your npm packages')
  .action(async (collectionName) => {
    const packs = await packagesInCollection(collectionName);
    execSync(prepareInstallCommand(packs), { stdio: 'inherit' });
  });

npmm
  .command('list')
  .option('-c, --collection <name>')
  .description('view user collections')
  .action(async (options) => {
    if (options.collection) {
      const packs = await packagesInCollection(options.collection);
      packs.forEach((pack) => {
        console.log(pack.name);
      });
    } else {
      const collections = await npmmAPI.getCollections();
      collections.forEach((collection) => {
        console.log(collection.collection_name);
      });
    }
  });

npmm
  .command('who')
  .description('view who is signed on')
  .action(async () => {
    const email = await store.getEmail();
    console.log(email);
  });

npmm
  .command('set-user')
  .description('set the user email for NPMM')
  .action(() => {
    const questions = [
      {
        type: 'text',
        name: 'intro',
        message: 'Welcome to NPMM press enter to begin'
      },
      {
        type: 'text',
        name: 'email',
        message: 'NPMM username?'
      },
      {
        type: 'password',
        name: 'password',
        message: 'NPMM password?'
      } 
    ];
    (async () => {
      const response = await prompts(questions);
      const { email, password } = response;
      npmmAPI.login(email,password);
    })();

  });

// 113-0668256-0077045
npmm.parse(process.argv);
