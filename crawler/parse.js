const cheerio = require('cheerio');
const utils = require('../utils/utils');

const matchReg = utils.matchReg;
const trim = utils.trimStr;
const strictTrim = utils.strictTrim;

const parseBody = body => {
  const $ = cheerio.load(body);
  let result = [];
  $('.js_fang_list li').each((i, elem) => {
    let info = {};
    const $ = cheerio.load(elem);
    const title = trim($('.prop-title').text());
    const mainInfo = strictTrim($('.info-table .row1-text').text());
    const totalPrice = +trim($('.info-table .total-price').text());
    const unitPrice = +matchReg(strictTrim($('.info-table .price-item').eq(1).text()), 'num');
    const location = strictTrim($('.property-tag-container span').eq(0).text());
    const specialExplain = $('.property-tag-container span').eq(1).text();
    info = {
      title: title,
      mainInfo: mainInfo,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
      location: location,
      specialExplain: specialExplain
    };
    console.dir(info);
    result.push(info);
  })
  return result;
}

module.exports = {
  parseBody: parseBody
}