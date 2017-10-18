const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../utils/date_util');
const realestate = require('../model/realestate');
const realEstateInfoSchema = new Schema(realestate.realEstateInfoSchema);

const realestateModel = mongoose.model('realestate', realEstateInfoSchema);

const modelSave = (collection, station) => {
  for (let i = 0; i < collection.length; i++) {
    const ele = collection[i];
    ele.station = station.station;
    ele.line = station.line;
    ele.updateTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
    realestateModel.collection.insert(ele);
  }
}

module.exports = {
  modelSave: modelSave
}