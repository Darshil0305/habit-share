import { useState } from 'react'
import { motion } from 'framer-motion'

export default function AuthForm({ onAuthSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSignup, setIsSignup] = useState(window.location.hash === '#signup')

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || {}

    if (isSignup) {
      if (users[username]) {
        setError('Username already taken')
      } else if (password !== confirmPassword) {
        setError('Passwords do not match')
      } else if (username.length < 3) {
        setError('Username must be at least 3 characters')
      } else if (password.length < 6) {
        setError('Password must be at least 6 characters')
      } else {
        users[username] = { password }
        localStorage.setItem('users', JSON.stringify(users))
        localStorage.setItem('currentUser', username)
        onAuthSuccess(username)
      }
    } else {
      if (users[username] && users[username].password === password) {
        localStorage.setItem('currentUser', username)
        onAuthSuccess(username)
      } else {
        setError('Invalid username or password')
      }
    }
  }

  const toggleMode = () => {
    setIsSignup(!isSignup)
    setError('')
    window.location.hash = isSignup ? '' : '#signup'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-effect p-8 rounded-xl shadow-glow-primary"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-3xl font-bold mb-6 text-center gradient-text"
      >
        {isSignup ? 'Create Account' : 'Welcome Back'}
      </motion.h2>

      {error && (
        <motion.div
          variants={itemVariants}
          className="bg-red-900/50 border border-red-700 p-3 rounded mb-4 text-center"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div variants={itemVariants}>
          <label className="block text-gray-300 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
            required
            minLength="3"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
            required
            minLength="6"
          />
        </motion.div>

        {isSignup && (
          <motion.div variants={itemVariants} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className="block text-gray-300 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              required
            />
          </motion.div>
        )}

        <motion.button
          variants={itemVariants}
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-lg font-medium mt-4"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </motion.button>

        <motion.div variants={itemVariants} className="text-center text-gray-400 mt-4">
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-indigo-400 hover:underline"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </motion.div>
      </form>
    </motion.div>
  )
}
