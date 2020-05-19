const { Command } = require('commander');
const { execSync } = require('child_process');
const fs = require('fs');
const chalk = require('chalk');
const prompts = require('prompts');
const npmmAPI = require('./services/npmmAPI');
const store = require('./lib/store');
const { prepareInstallCommand, packagesInCollection } = require('./lib/helper');

const npmm = new Command();

npmm
  .command('launch [collection]')
  .description('installs your npm packages')
  .action(async (collectionName) => {
    if (!(await store.getEmail())) {
      console.log(chalk.red('No one is signed in.'));
      console.log('Make sure to execute: npmm login');
      return;
    }

    if (collectionName === 'Favorites') {
      console.log(chalk.red("You're not allowed install Favorites. It's for your own safety."));
      return;
    }

    const packs = await packagesInCollection(collectionName);

    if (!packs) {
      console.log(chalk.red(`That collection doesn't exist. \nRun ${chalk.white.bold('npmm list')} to view packages`));
      return;
    }

    if (!fs.existsSync(`${process.cwd()}/package.json`)) {
      console.log(chalk.bold.magenta(`No ${chalk.white('package.json')} found. Initializing a new NPM project...`));
      execSync('npm init -y');
    }
    execSync(prepareInstallCommand(packs), { stdio: 'inherit' });

    console.log(chalk.bold.magenta('Packed by NPMM ٩(◕‿◕｡)۶'));
  });

npmm
  .command('list')
  .option('-c, --collection [name]')
  .description('view user collections')
  .action(async (options) => {
    if (!(await store.getEmail())) {
      console.log(chalk.red('No one is signed in.'));
      console.log('Make sure to execute: npmm login');
      return;
    }

    if (options.collection) {
      const packs = await packagesInCollection(options.collection);

      if (!packs) {
        console.log(chalk.red('There are no packages in this collection.'));
        console.log(`Go to ${chalk.bold.underline('https://npmm.dev')} to search and add to your collections.\n`);
        return;
      }

      console.log(chalk.magenta.bold(`\n${options.collection} Packages \n==================`));
      packs.forEach((pack) => {
        console.log(`${chalk.bold.magenta(String.fromCharCode(187))} ${chalk.bold(pack.name)}`);
      });
    } else {
      const collections = await npmmAPI.getCollections();
      console.log(chalk.magenta.bold('\nCollections \n==========='));
      collections.forEach((collection) => {
        console.log(`${chalk.bold.magenta(String.fromCharCode(187))} ${chalk.bold(collection.collection_name)}`);
      });
    }
  });

npmm
  .command('who')
  .description('view who is signed on')
  .action(async () => {
    const email = await store.getEmail();
    if (!email) {
      console.log(chalk.red('No one is signed in.'));
      console.log('Make sure to execute: npmm login');
    } else {
      console.log(`${chalk.bold('Email:')} ${email}`);
    }
  });

npmm
  .command('export')
  .option('-a, --alias [exportAs]')
  .description('exports current dependencies into a new collection')
  .action(async (options) => {
    let currentPackages;
    let namedExport;

    const email = await store.getEmail();
    if (!email) {
      console.log(chalk.red('No one is signed in.'));
      console.log('Make sure to execute: npmm login');
      return;
    }

    fs.readFile('./package.json', 'utf8', (err, data) => {
      if (typeof options.alias === 'string') {
        namedExport = options.alias;
      } else {
        namedExport = JSON.parse(data).name;
      }
      currentPackages = Object.keys(JSON.parse(data).dependencies);
    });

    const create = await npmmAPI.createCollection(namedExport);
    if (create) {
      const { id } = create;
      for (let i = 0; i < currentPackages.length; i += 1) {
        npmmAPI.exportPackages(id, currentPackages[i]);
      }
      console.log('created!');
    }
  });

npmm
  .command('login')
  .description('set the user email for your NPMM account')
  .action(async () => {
    console.log(
      chalk.bold.magenta(`
 _   _ _____  __  __ __  __
| \\ | |  __ \\|  \\/  |  \\/  |
|  \\| | |__) |      |      |
| .   |  ___/| |\\/| | |\\/| |
| |\\  | |    | |  | | |  | |
|_| \\_|_|    |_|  |_|_|  |_|
 `),
    );
    console.log(chalk.bold.magenta('Welcome to the Node Package Manager Manager'));
    const questions = [
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
      console.log(chalk.bold.magenta(`\nSuccess! Run ${chalk.bold.white('npmm list')} to see your collections.`));
    } else {
      console.log(chalk.red('Please enter a valid email address'));
    }
  });

// 113-0668256-0077045
npmm.parse(process.argv);

// 113-0668256-0077045
