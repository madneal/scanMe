const config = require('../config/config');
const request = require('request');

const url = config.url;

const execute = () => {
  request({
    url: url.ershoufang.lianjia,
  }, (err, res, body) => {
    if (res) {
      console.log(body);
    }
  })
}

module.exports = {
  execute: execute
}