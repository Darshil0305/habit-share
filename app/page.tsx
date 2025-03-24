'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AuthForm from '../components/AuthForm'
import HabitDashboard from '../components/HabitDashboard'
import { initDB } from '../lib/db'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      await initDB()
      const storedUser = localStorage.getItem('currentUser')
      if (storedUser) setUser(storedUser)
      setLoading(false)
    }
    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-10 h-10 border-4 border-indigo-500 rounded-full border-t-transparent"
        />
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4 max-w-4xl mx-auto">
      {!user ? (
        <div className="flex items-center justify-center min-h-[80vh]">
          <AuthForm onAuthSuccess={setUser} />
        </div>
      ) : (
        <HabitDashboard user={user} setUser={setUser} />
      )}
    </main>
  )
}
