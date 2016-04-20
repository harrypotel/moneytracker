var mongoose = require('mongoose')
var Schema = mongoose.Schema

var expensesSchema = new Schema({
  date: Date,
  amount: Number,
  description: String,
  category: String
})

module.exports = mongoose.model('Expenses', expensesSchema)
