const request = require('request');
const chalk = require('chalk');
const parse = require('./parse');
const utils = require('../utils/utils');
const config = require('../config/config');
const saveModel = require('../model/save_model');

const parseBody = parse.parseBody;
const url = config.url;
const stations = config.stationObj;
const modelSave = saveModel.modelSave;

const makeRequest = (requestConfig, stationInfo) => {
  request(requestConfig, (err, res, body) => {
    if (res && res.statusCode === '200') {
      const parseResult = parseBody(body);
      const result = parseResult.result;
      modelSave(result, stationInfo);
      if (parseResult.nextPageUrl) {
        requestConfig.url = url + nextPageUrl;
        makeRequest(requestConfig, stationInfo);
      }
    } else {
      console.error(chalk.red('There is no response for ' + requestConfig.url));
      console.dir(stationInfo);
    }
  })
}

const execute = () => {

  for (var lineName in stations) {
    const line = lineName;
    const stationArr = stations[line];
    for (let i = 0; i < stationArr.length; i ++) {
      const station = stationArr[i];
      const requestConfig = {
        url: config.url.ershoufang.lianjia +'rs' + station,
        encoding: 'utf-8'
      };
      const stationInfo = {
        station: station,
        line: line
      };
      makeRequest(requestConfig, stationInfo);
    }
  }
}

module.exports = {
  execute: execute
}