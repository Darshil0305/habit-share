import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HabitForm from '../components/HabitForm'
import HabitList from '../components/HabitList'
import UserProfile from '../components/UserProfile'
import FriendsActivity from '../components/FriendsActivity'
import SocialFeed from '../components/SocialFeed'

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
}

export default function Home() {
  const [habits, setHabits] = useState([])
  const [activeTab, setActiveTab] = useState('habits')

  // Load habits from localStorage
  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || []
    setHabits(savedHabits)
  }, [])

  // Save habits to localStorage when they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <UserProfile />
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <nav className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('habits')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'habits' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                >
                  My Habits
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('social')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'social' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                >
                  Social Feed
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('friends')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'friends' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                >
                  Friends Activity
                </motion.button>
              </nav>
            </motion.div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === 'habits' && (
                <motion.div
                  key="habits"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h1 className="text-3xl font-bold">My Habits</h1>
                  <HabitForm setHabits={setHabits} />
                  <HabitList habits={habits} setHabits={setHabits} />
                </motion.div>
              )}
              {activeTab === 'social' && (
                <motion.div
                  key="social"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h1 className="text-3xl font-bold">Social Feed</h1>
                  <SocialFeed />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FriendsActivity />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
