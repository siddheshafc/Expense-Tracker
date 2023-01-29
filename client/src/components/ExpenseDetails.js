import { useExpensesContext } from '../hooks/useExpensesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import {BiShoppingBag, BiRupee, BiCategory} from 'react-icons/bi'
import {BASE_URL} from "../helper"
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ExpenseDetails = ({ expense, }) => {
  const { dispatch } = useExpensesContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch(`${BASE_URL}/api/expenses/` + expense._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_EXPENSE', payload: json})
    }
  }
  return (
    <div className="expense-details">
      <h4><BiShoppingBag />{expense.title}</h4>
      <p><strong><BiRupee />Cost: </strong>{expense.cost}</p>
      <p><strong><BiCategory /> Category: </strong>{expense.category}</p>
      <p>{formatDistanceToNow(new Date(expense.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default ExpenseDetails