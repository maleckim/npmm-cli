const { Command } = require('commander');
const { execSync } = require('child_process');
const fs = require('fs');
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

    if (!fs.existsSync(`${process.cwd()}/package.json`)) {
      execSync('npm init -y', { stdio: 'inherit' });
    }
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
  .command('login')
  .description('set the user email for your NPMM account')
  .action(async () => {
    const questions = [
      {
        type: 'text',
        name: 'intro',
        message: 'Welcome to NPMM press enter to begin login',
      },
      {
        type: 'text',
        name: 'email',
        message: 'Email: ',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password: ',
      },
    ];
    const response = await prompts(questions);
    const { email, password } = response;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      npmmAPI.login(email, password);
    } else {
      console.log('Please enter a valid email address');
    }
  });

// 113-0668256-0077045
npmm.parse(process.argv);
