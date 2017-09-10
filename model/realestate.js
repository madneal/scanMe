module.exports = mongoose => {
  const Schema = mongoose.Schema;

  const realEstateInfoSchema = new Schema({
    title: String,
    station: String,
    line: String,
    mainInfo: String,
    unitPrice: Integer,
    totalPrice: Integer,
    location: String,
    specialExplain: String,
    updateTime: String,
    url: url
  });

  realEstateInfoSchema.index({
    'title': 1,
    'line': 1,
    'station': 1
  }, {
    unique: true,
    strict: false
  });

  mongoose.model('real_estate_info', realEstateInfoSchema);
}