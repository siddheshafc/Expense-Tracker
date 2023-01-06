import { useAuthContext } from './useAuthContext'
import { useExpensesContext } from './useExpensesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchExpenses } = useExpensesContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchExpenses({ type: 'SET_EXPENSES', payload: null })
  }

  return { logout }
}