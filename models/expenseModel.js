const mongoose = require('mongoose')

const Schema = mongoose.Schema

const expenseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Expense', expenseSchema)