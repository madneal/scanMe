const chalk = require('chalk');

const regObj = {
  'num': /\d+/,
  'line': /\d+号线/,
  'station': /\d+号线([\u4e00-\u9fa5]+)\d+米/,
  'distance': /(\d+)米/
}

const trimStr = str => {
  if (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  } else {
    return str;
  }
}

const strictTrim = str => {
  if (str) {
    return str.replace(/\s+/g, '');
  } else {
    return str;
  }
}

const matchReg = (str, type) => {
  const result = str.match(regObj[type]);
  if (Array.isArray(result)) {
    if (result.length === 1) {
      if (type === 'station' || type === 'distance') {
        return result[1];
      } else {
        return result[0];
      }
    } else {
      console.log(chalk.red('the legnth of the matchReg is:' + result.length));
    }
  } else {
    console.error(chalk.red('matchReg result is not array: ' + result));
  }
}

module.exports = {
  trimStr: trimStr,
  strictTrim: strictTrim,
  matchReg: matchReg
}