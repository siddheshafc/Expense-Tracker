import { useEffect }from 'react'
import { useExpensesContext } from "../hooks/useExpensesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ExpenseDetails from '../components/ExpenseDetails'
import ExpenseForm from '../components/ExpenseForm'

const Home = () => {
  const {expenses, dispatch} = useExpensesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch('/api/expenses', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_EXPENSES', payload: json})
      }
    }

    if (user) {
      fetchExpenses()
    }
  }, [dispatch, user])

  return (
    <>
    <h2>Keep track of your expenses on your fingertips by using SaveBucks</h2>
    <hr/>
    <div className="home">
      <div className="expenses">
        {expenses && expenses.map((expense) => (
          <ExpenseDetails key={expense._id} expense={expense} />
        ))}
      </div>
      <ExpenseForm />
    </div>
  
    </> 
  )
}

export default Home