const express = require('express')
const {
  createExpense,
  getExpenses,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../controllers/expenseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all expense routes
router.use(requireAuth)

// GET all expenses
router.get('/', getExpenses)

//GET a single expense
router.get('/:id', getExpense)

// POST a new expense
router.post('/', createExpense)

// DELETE a expense
router.delete('/:id', deleteExpense)

// UPDATE a expense
router.patch('/:id', updateExpense)


module.exports = router