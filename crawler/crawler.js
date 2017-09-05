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
        const totalPrice = trim($('.info-table .total-price').text());
        const perPrice = $('.info-table .price-item').eq(1).text();
        const location = strictTrim($('.property-tag-container span').eq(0).text());
        const specialExplain = $('.property-tag-container span').eq(1).text();
        info = {
          title: title,
          mainInfo: mainInfo,
          perPrice: perPrice,
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