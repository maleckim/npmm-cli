const { Command } = require('commander');
const { execSync } = require('child_process');
const npmmAPI = require('./services/npmmAPI');
const store = require('./lib/store');
const { prepareInstallCommand, findCollectionId } = require('./lib/helper');

const npmm = new Command();

npmm
  .command('launch <collection_name>')
  .description('installs your npm packages')
  .action(async (collectionName) => {
    const id = await findCollectionId(collectionName);
    const packs = await npmmAPI.getPackages(id);
    execSync(prepareInstallCommand(packs), { stdio: 'inherit' });
    // console.log(prepareInstallCommand(packs));
  });

npmm
  .command('view')
  .description('view user collections')
  .action(async () => {
    const collections = await npmmAPI.getCollections();
    collections.forEach((collection) => {
      console.log(collection.collection_name.replace(' ', '-'));
    });
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
