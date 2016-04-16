var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// Lets define a port we want to listen to
const PORT = 8080

app.use(bodyParser.json())

// findAll
app.get('/api/invoices', function (req, res) {
  var invoices = ['invoice1', 'invoice2']
  res.send(invoices)
})

// findOne
app.get('/api/invoices/:id', function (req, res) {
  // TODO get from mongo

  var invoices = {
    _id: req.params.id
  }
  res.send(invoices)
})

app.post('/api/invoices', function (req, res) {
  var invoice = {
    _id: req.body._id
  }

  // TODO save to mongo
  console.log('Invoice creada: ' + invoice._id)

  res.sendStatus(200)
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})
