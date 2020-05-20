/* eslint-disable implicit-arrow-linebreak */
const fetch = require('node-fetch');
const chalk = require('chalk');
const { API_ENDPOINT } = require('../config');
const store = require('../lib/store');

const npmmAPI = {
  getPackages: async (id) => {
    const token = await store.getToken();
    return fetch(`${API_ENDPOINT}/api/collections/${id}?justNames=true`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) =>
      res.ok ? res.json() : console.log(chalk.red('There was an getting packages in the specified collection...')),
    );
  },
  createCollection: async (name) => {
    const token = await store.getToken();
    return fetch(`${API_ENDPOINT}/api/collections`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    }).then((res) =>
      res.ok
        ? res.json()
        : console.log(
            chalk.red(
              `There was an issue creating your collection...\nThis is probably because the collection name is already taken. \n\nTry running ${chalk.white.bold(
                'npmm export -a [name of new collection]',
              )}`,
            ),
          ),
    );
  },
  exportPackages: async (collectionId, name) => {
    const token = await store.getToken();
    return fetch(`${API_ENDPOINT}/api/packages`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ collectionId, name }),
    }).then((res) => (res.ok ? res.json() : console.log(chalk.red('There was an issue exporting your packages...'))));
  },
  getCollections: async () => {
    const token = await store.getToken();
    return fetch(`${API_ENDPOINT}/api/collections`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => (res.ok ? res.json() : console.log(chalk.red('There was an issue getting your collections...'))));
  },
  login: (email, password) =>
    fetch(`${API_ENDPOINT}/api/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        } else {
          return res.json();
        }
      })
      .then((res) => {
        store.setToken(res.authToken);
        store.setEmail(email);
      })
      .catch(() => {
        console.log(chalk.red('Error with signin, invalid credentials.'));
      }),
};

module.exports = npmmAPI;
