const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const rootPath = path.normalize(__dirname);
const config = require('../config/config');
const chalk = require('chalk');

const initMongooseAndLoadModel = (app, config) => {
  
  if (!config) {
    console.log('Error initializing mongo, please set config params (2 params) with object.models and object.connection');
    return;
  }

  if (!config.hasOwnProperty(('connection'))) {
    console.log('Error, initizializing mongo, please add params object.connection');
  }

  if (app) {
    app.set('mongoose', mongoose);
  }

  const modelPath = rootPath + '/' + config.model;
  const modelLoaded = config.modelName;
  mongoose.connect(config.connection);

  mongoose.connection.on('connected', function () {
    console.info(chalk.red('_______________________________________________________________'));
    console.info(chalk.red('Mongo DB - start info log'));
    console.info(chalk.blue('connect to: ' + config.connection));

    for (let i = 0; i < modelLoaded.length; i ++) {
      console.info(chalk.green('loaded: ' + modelLoaded[i]));
    }
    console.info(chalk.red('_______________________________________________________________'));
  });

  mongoose.connection.on('error', console.error.bind(console, chalk.red('MONGODB CONNECTION ERROR\n')));

  mongoose.connection.on('disconnected', console.error.bind(console, chalk.red('MONGODB DISCONNECTED\n')));

  mongoose.connection.on('reconnected', console.error.bind(console, chalk.blue('MONGODB RECONNECTED\n')));

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  return mongoose;
}

module.exports = {
  initMongooseAndLoadModel: initMongooseAndLoadModel
}