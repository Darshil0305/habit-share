import { useState } from 'react'

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || {}

    if (mode === 'signup') {
      if (users[email]) {
        setError('User already exists')
      } else {
        users[email] = { password }
        localStorage.setItem('users', JSON.stringify(users))
        alert('Account created successfully!')
        resetForm()
      }
    } else {
      if (users[email] && users[email].password === password) {
        localStorage.setItem('currentUser', email)
        alert('Login successful!')
        resetForm()
      } else {
        setError('Invalid email or password')
      }
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setError('')
  }

  return (
    <div className="glass-effect p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{mode === 'signup' ? 'Sign Up' : 'Login'}</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
          required
        />
        <button
          type="submit"
          className="w-full bg-primary p-2 rounded hover:bg-primary-dark"
        >
          {mode === 'signup' ? 'Create Account' : 'Login'}
        </button>
      </form>
    </div>
  )
}
