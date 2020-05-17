const { Command } = require('commander');
const { execSync } = require('child_process');
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
  .command('set-user <email> <password>')
  .description('set the user email for NPMM')
  .action((email, password) => {
    npmmAPI.login(email, password);
  });

// 113-0668256-0077045
npmm.parse(process.argv);
