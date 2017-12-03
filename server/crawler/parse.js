const cheerio = require('cheerio');
const utils = require('../utils/utils');

const matchReg = utils.matchReg;
const trim = utils.trimStr;
const strictTrim = utils.strictTrim;

const parseMainInfo = str => {
  const arr = str.split('|');
  return {
    type: arr[0],
    square: arr[1],
    floor: arr[2],
    direction: arr[3]
  };
}

const parseBody = body => {
  const $ = cheerio.load(body);
  let result = [];
  const lastPage = $('.c-pagination').children().last().text();
  const isNextPage = lastPage === '下一页' ? true : false;
  $('.js_fang_list li').each((i, elem) => {
    let info = {};
    const $ = cheerio.load(elem);
    const title = trim($('.prop-title').text());
    const url = 'http://sh.lianjia.com/' + $('.prop-title a').attr('href');
    const mainInfo = strictTrim($('.info-table .row1-text').text());
    const totalPrice = +trim($('.info-table .total-price').text());
    const unitPrice = +matchReg(strictTrim($('.info-table .price-item').eq(1).text()), 'num');
    const spans = $('.property-tag-container span');
    let location;
    let specialExplain;
    let line, station, distance;
    if (!spans) {
      console.log('There is not location or specialExplain information' + url);
    } else {
      if ($(spans).eq(0).text().indexOf('距离') !== -1) {
        location = $(spans).eq(0).text();
        specialExplain = $(spans).eq(1).text();
      } else {
        specialExplain = $(spans).eq(0).text();
      }
    }
    if (location) {
      line = matchReg(location, 'line');
      station = matchReg(location, 'station');
      distance = matchReg(location, 'distance');
    } else {

    }
    const houseInfo = parseMainInfo(mainInfo);
    info = {
      title: title,
      type: houseInfo.type,
      square: houseInfo.square,
      direction: houseInfo.direction,
      floor: houseInfo.floor,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
      location: location,
      specialExplain: specialExplain,
      url: url,
      line: line,
      station: station,
      distance: distance
    };
    console.dir(info);
    result.push(info);
  })
  return {
    result: result,
    nextPageUrl: isNextPage ? $('.c-pagination').children().last().attr('href') : ''
  }
}

module.exports = {
  parseBody: parseBody
}