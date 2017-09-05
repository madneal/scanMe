const chalk = require('chalk');

const regObj = {
  'num': /\d+/
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
  if (result.length === 1) {
    return result[0];
  } else {
    console.log(chalk.red('the legnth of the matchReg is:' + result.length));
  }
}

module.exports = {
  trimStr: trimStr,
  strictTrim: strictTrim
}