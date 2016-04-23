var log = require('debug')('moneytracker:root')
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Expenses = require('./domain/expenses/expensesPersistence.js')

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

// findAll
app.get('/api/expenses', Expenses.find, function (req, res, next) {
  res.send(req.expenses)
}
)

// findOne
app.get('/api/expenses/:id', Expenses.findById, function (req, res, next) {
  res.send(req.expense)
})

app.post('/api/expenses', Expenses.create, function (req, res, next) {
  res.sendStatus(200)
})

app.listen(PORT, function () {
  log('Example app listening on port ' + PORT)
})
