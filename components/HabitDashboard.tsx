'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HabitForm from './HabitForm'
import HabitList from './HabitList'
import StatsPanel from './StatsPanel'
import Leaderboard from './Leaderboard'
import { getHabits, addHabit, updateHabit, deleteHabit, recordCompletion } from '../lib/db'

export default function HabitDashboard({ user, setUser }: { user: string, setUser: (user: string | null) => void }) {
  const [habits, setHabits] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('habits')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHabits = async () => {
      const loadedHabits = await getHabits(user)
      setHabits(loadedHabits)
      setLoading(false)
    }
    loadHabits()
  }, [user])

  const handleAddHabit = async (habit: any) => {
    const newHabit = await addHabit(user, habit)
    setHabits([...habits, newHabit])
  }

  const handleToggleComplete = async (id: string) => {
    const habit = habits.find(h => h.id === id)
    if (!habit) return

    const updatedHabit = {
      ...habit,
      completed: !habit.completed,
      streak: !habit.completed ? (habit.streak || 0) + 1 : habit.streak
    }

    await updateHabit(updatedHabit)
    if (!habit.completed) {
      await recordCompletion(id)
    }
    setHabits(habits.map(h => h.id === id ? updatedHabit : h))
  }

  const handleDeleteHabit = async (id: string) => {
    await deleteHabit(id)
    setHabits(habits.filter(h => h.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-10 h-10 border-4 border-indigo-500 rounded-full border-t-transparent"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Welcome, {user}!
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>

      <div className="flex space-x-2 border-b border-gray-700">
        {['habits', 'stats', 'leaderboard'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab === tab ? 'bg-gray-700/50 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'habits' && (
            <div className="space-y-6">
              <HabitForm onSubmit={handleAddHabit} />
              <HabitList
                habits={habits}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteHabit}
              />
            </div>
          )}

          {activeTab === 'stats' && <StatsPanel habits={habits} />}
          {activeTab === 'leaderboard' && <Leaderboard user={user} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
