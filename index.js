var log = require('debug')('moneytracker:root')
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Expenses = require('domain/expenses/expenses')

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
app.get('/api/expenses', function (req, res) {
  Expenses.find(function (err, results) {
    if (err) return console.error(err)
    res.send(results)
  })
})

// findOne
app.get('/api/expenses/:id', function (req, res) {
  Expenses.findById(req.params.id, function (err, results) {
    if (err) return console.error(err)
    res.send(results)
  })
})

app.post('/api/expenses', function (req, res) {
  var expense = new Expenses()
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
