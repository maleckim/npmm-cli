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
    const { id } = collections.find((collection) => collection.collection_name === name);
    const packs = await npmmAPI.getPackages(id);

    return packs;
  },
};
