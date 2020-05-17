const { Command } = require("commander");
// const exec = require("./lib/execSync");
const fetch = require("node-fetch");
const npmmAPI = require('./services/npmmAPI')
const store = require('./lib/localPersist')
const {prepareInstallCommand, findCollectionId} = require('./lib/helper')
const execSync = require('child_process').execSync;

const npmm = new Command();

function displayCollections(userCollections) {
  for (let i in userCollections) {
    console.log(`${userCollections[i].collection_name}`);
  }
}

npmm
  .command("launch <collection_name>")
  .description("installs your npm packages")
  .action(async (collectionName) => {
    const id = await findCollectionId(collectionName)
    const packs = await npmmAPI.getPackages(id)
    // execSync(prepareInstallCommand(packs))
    console.log(prepareInstallCommand(packs))
  });

npmm
  .command("view")
  .description("view user collections")
  .action(async () => {
    const collections = await npmmAPI.getCollections();
    collections.forEach((collection) => {
      console.log(collection.collection_name.replace(' ', '-'));
    });
  });

npmm
  .command("who")
  .description("view who is signed on")
  .action(async () => {
    const email = await store.getEmail();
    console.log(email)
  });

npmm
  .command("set-user <email> <password>")
  .description("set the user email for NPMM")
  .action((email, password) => {
    npmmAPI.login(email, password)
  });

// 113-0668256-0077045
npmm.parse(process.argv);
