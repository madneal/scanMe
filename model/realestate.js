module.exports = mongoose => {
  const Schema = mongoose.Schema;

  const realEstateInfoSchema = new Schema({
    title: String,
    mainInfo: String,
    unitPrice: String,
    totalPrice: String,
    specialExplain: String,
    updateTime: String
  });

  // realEstateInfoSchema.index({
  //   'updateTime': 1
  // }, {
  //   unique: true,
  //   strict: false
  // });

  mongoose.model('real_estate_info', realEstateInfoSchema);
}