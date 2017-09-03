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

module.exports = {
  trimStr: trimStr,
  strictTrim: strictTrim
}