const request = require('request');
const chalk = require('chalk');
const parse = require('./parse');
const utils = require('../utils/utils');
const config = require('../config/config');
const saveModel = require('../model/save_model');

const parseBody = parse.parseBody;
const url = config.url;
const stationArr = config.stationArr;
const modelSave = saveModel.modelSave;

const execute = () => {
  request({
    url: url.ershoufang.lianjia,
    encoding: 'utf-8'
  }, (err, res, body) => {
    if (res) {
      const result = parseBody(body);
      modelSave(result);
    }
  })
}

module.exports = {
  execute: execute
}