/* eslint-disable max-len */
const npmmAPI = require('../services/npmmAPI');

module.exports = {
  prepareInstallCommand(packs) {
    let command = 'npm i';

    packs.forEach((pack) => {
      command += ` ${pack.name}`;
    });

    return command;
  },
  packagesInCollection: async (name) => {
    const collections = await npmmAPI.getCollections();

    const specifiedCollection = collections.find((collection) => collection.collection_name === name);

    if (!specifiedCollection) {
      return false;
    }

    const packs = await npmmAPI.getPackages(specifiedCollection.id);

    return packs;
  },
};
