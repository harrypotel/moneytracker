var mongoose = require('mongoose')
var Expenses = require('./expenses.js')

module.exports.find = function find (req, res, next) {
  Expenses.find(function (err, expenses) {
    if (err) {
      console.error('Error finding expenses: ' + err)
      return next(err)
    }

    req.expenses = expenses
    return next()
  })
}

module.exports.findById = function findById (req, res, next) {
  var id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new Error('You must supply a valid Expense ID'))
  }

  Expenses.findById(id, function (err, expense) {
    if (err || !expense) {
      console.error('Cannot find expenses with id: ' + id)
      return next(err)
    }

    req.expense = expense
    return next()
  })
}

module.exports.create = function create (req, res, next) {
  var expense = new Expenses()
  expense.name = req.body.name
  expense.date = req.body.date
  expense.description = req.body.description

  expense.save(function (err, expense) {
    if (err) {
      console.error('Error trying to create expense: ' + expense.name + ', description: ' + expense.description + 'date: ' + expense.date + '')
      return next(err)
    }
  })
}
