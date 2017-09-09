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
    if (res) {
      const result = parseBody(body);
      modelSave(result, stationInfo);
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
        url: config.url.ershoufang.lianjia + station,
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