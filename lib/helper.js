const npmmAPI = require('../services/npmmAPI');

module.exports = {
  prepareInstallCommand(packs) {
    let command = 'npm i';

    packs.forEach((pack) => {
      command += ` ${pack.name}`;
    });

    return command;
  },
  findCollectionId: async (name) => {
    const collections = await npmmAPI.getCollections();
    return collections.find((collection) => collection.collection_name === name).id;
  },
};
