module.exports = mongoose => {
  let Schema = mongoose.Schema;

  let realEstateInfoSchema = new Schema({
    title: String,
    totalPrice: String,
    unitPrice: String,
    mainInfo: String,
    location: String,
    builtYear: String
  })
}