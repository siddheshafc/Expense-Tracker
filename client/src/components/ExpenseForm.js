import { useState } from "react"
import { useExpensesContext } from "../hooks/useExpensesContext"
import { useAuthContext } from '../hooks/useAuthContext'
import {BiShoppingBag, BiRupee, BiCategory} from 'react-icons/bi'
import {BASE_URL} from "../helper"

const ExpenseForm = () => {
  const { dispatch } = useExpensesContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [cost, setCost] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const expense = {title, cost, category}

    const response = await fetch(`${BASE_URL}/api/expenses`, {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setCost('')
      setCategory('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_EXPENSE', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add an new expense</h3>

      
      <label><BiShoppingBag size={18} /> Expense Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
        placeholder="Pizza, Clothes, Electric Bill..."
      />

      <label><BiRupee size={18}/>Cost:</label>
      <input 
        type="number"
        onChange={(e) => setCost(e.target.value)}
        value={cost}
        className={emptyFields.includes('cost') ? 'error' : ''}
        placeholder="₹100, ₹500...."
      />

      <label><BiCategory size={18} /> Category:</label>
      <input 
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields.includes('category') ? 'error' : ''}
        placeholder="Food, Entertainment, Shopping, Bills..."
      />

      <button>Add expense</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ExpenseForm