---
layout: page
permalink: /wiki/building-from-source
index: 3
---

# Building from source

Follow these steps to brew the latest image of Moosync from our github repository with all the newest features and bug fixes.

## Requirements

- [NodeJS](https://nodejs.org/en/)
- Package manager like [Yarn](https://yarnpkg.com/getting-started/install) or [NPM](https://www.npmjs.com/)

## Setting up the project

Clone the project from github

``` bash
git clone https://github.com/Moosync/moosync-app
```

## Downloading dependencies

Use yarn or npm to install dependencies inside the project root

``` bash
yarn install
```

## Setting up environment variables

- Add appropriate values inside sample.config.env
- Rename sample.config.env to config.env

## Post installation

Native dependencies need to be compiled for electron separately.

Incase this does not work, you can run

``` bash
yarn native
```

To compile native dependencies.

## Running in development environment

To serve the app, run

```bash
yarn electron:serve
```

## Building a production build

Before generating a production build, take a look at [vue.config.js](https://github.com/Moosync/moosync-app/blob/main/vue.config.js) and change the builder options as required.

To generate a production optimized version run

``` bash
yarn electron:build
```
