# NPMM CLI

[![CodeFactor](https://www.codefactor.io/repository/github/maleckim/npmm-cli/badge)](https://www.codefactor.io/repository/github/maleckim/npmm-cli)

NPMM allows developers to frictionlessly browse and save npm packages. Saved packages can then be programmatically installed with our command line interface. Imagine the [npmjs.com](https://npmjs.com) website but with a few extra features for ease of use. A live demo can be found at [https://npmm.dev/](https://npmm.dev/)

![CLI demo](https://gist.github.com/dannydi12/8c36e9833a3b0e66d6fbd10585ba3a09/raw/458888b90b14bb2719e52bebbc5f06249f737e21/demo.gif)

**This CLI package is an extension of the goals mentioned above. This should primarily be used to help speed up the development process by initiating `package.json` files and installing groups of packages you frequently use.**

## Setup

Install the NPMM CLI to run as a global npm package for ease of access.

### `npm i npmm -g`

Once that's installed, go to [npmm.dev](https://npmm.dev/signup) to create an account so you can create and view your collections of packages.

## Usage

### `npmm login`

You need to link to your NPMM account to access your collections. Run this for a one-time login setup.

### `npmm list`

Lists all collections the user has on the NPMM website.

_options:_
-c \[collection name\] (to see all the packages in a specified collection)

### `npmm launch [collection name]`

Installs all the packages in a specified collection. This can be used to bootstrap your project and get things going.

**Warning: This will create a `package.json` file or will install more packages in an existing project!**

### `npmm export`

Reads your local `package.json` file and creates a new collection on the NPMM website with all the packages found in the dependencies. The collections are named based on the name of your project.

_options:_
-a \[new name\] (to manually name the new collection)

## The Authors

- **Vik Birdi** - [Portfolio](https://vikbirdi.com)
- **Daniel Di Venere** - [Portfolio](https://imdan.io/)
- **Matthew Malecki** - [Portfolio](https://portfolio.maleckim.now.sh/)
- **Michael Ploughman** - [Portfolio](https://MichaelHPloughman.com)
- **Josh Young** - [Portfolio](https://joshyoung.net)

## Acknowledgments

- [npms.io](https://npms.io) - An awesome elastic-search API for npm
- [npm](https://npmjs.com) - Only the best package manager ever

## License

This project is licensed under the MIT License
