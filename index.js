var log = require('debug')('moneytracker:root')
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()

// Lets define a port we want to listen to
const PORT = 8080

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
})


var expenseSchema = mongoose.Schema({
  _id: Number,
  date: Date,
  amount: Number,
  description: String,
  category: String
})

var Expense = mongoose.model('Expense', expenseSchema)

// findAll
app.get('/api/expenses', function (req, res) {
  Expense.find(function (err, results) {
    if (err) return console.error(err)
    res.send(results)
  })
})

// findOne
app.get('/api/expenses/:id', function (req, res) {
  Expense.findById(req.params.id, function (err, results) {
    if (err) return console.error(err)
    res.send(results)
  })
})

app.post('/api/expenses', function (req, res) {
  var expense = new Expense()
  expense._id = req.body._id
  expense.name = req.body.name
  expense.date = req.body.date
  expense.description = req.body.description

  expense.save(function (err, expense) {
    if (err) return console.error(err)
    log('New expense created: ' + expense)
  })

  res.sendStatus(200)
})

app.listen(PORT, function () {
  log('Example app listening on port ' + PORT)
})
