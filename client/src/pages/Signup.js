import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import {Link} from 'react-router-dom'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(name, email, password)
  }

  return (
  <div>
    <div className="top-banner">
      <h1><b>SaveBucks: Simplest way to track personal expenses</b></h1>
      <h2>Signup to create an account and start managing your expenses</h2>
    </div>
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Name:</label>
      <input type = "text" onChange={(e) => setName(e.target.value)} value={name} />
      
      <label>Email address:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />

      <label>Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}

      <h3>Existing User? <Link to="/login">Login</Link></h3>
    </form>

  </div>  
  )
}

export default Signup