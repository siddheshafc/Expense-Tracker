import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
  <div>
    <div className="top-banner">
      <h1>SaveBucks: Simplest way to track personal expenses</h1>
      <h2>Login and start managing your expenses</h2>
    </div>
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
      <h3>New User? <Link to="/signup">Signup</Link></h3>
    </form>
  </div>    
  )
}

export default Login