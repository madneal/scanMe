const config = require('../config/config');
const request = require('request');
const cheerio = require('cheerio');
const utils = require('../utils/utils');
const chalk = require('chalk');

const trim = utils.trimStr;
const strictTrim = utils.strictTrim;

const url = config.url;
const stationArr = config.stationArr;

const execute = () => {
  request({
    url: url.ershoufang.lianjia,
    encoding: 'utf-8'
  }, (err, res, body) => {
    if (res) {
      const $ = cheerio.load(body);
      let result = [];
      $('.js_fang_list li').each((i, elem) => {
        let info = {};
        const $ = cheerio.load(elem);
        const title = trim($('.prop-title').text());
        const mainInfo = strictTrim($('.info-table .row1-text').text());
        // console.log(chalk.green(mainInfo));
        const totalPrice = trim($('.info-table .total-price').text());
        // console.log(chalk.blue(totalPrice));
        const location = strictTrim($('.property-tag-container span').eq(0).text());
        const specialExplain = $('.property-tag-container span').eq(1).text();
        if (specialExplain) {
          // console.log(chalk.yellow(specialExplain));
        }
        // console.log(chalk.bgCyan(location));
        info = {
          title: title,
          mainInfo: mainInfo,
          totalPrice: totalPrice,
          location: location,
          specialExplain: specialExplain
        };
        console.dir(info);
      })
    }
  })
}

module.exports = {
  execute: execute
}