import AuthForm from '../components/AuthForm'
import { motion } from 'framer-motion'
import UserProfile from '../components/UserProfile'
import Greeting from '../components/Greeting'
import QuoteBox from '../components/QuoteBox'
import HabitList from '../components/HabitList'

export default function Home({ user, setUser }) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <AuthForm onAuthSuccess={(username) => setUser(username)} />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Greeting username={user} />
          <QuoteBox />
          <HabitList />
        </div>
        <div className="space-y-6">
          <UserProfile />
        </div>
      </div>

      <button 
        onClick={() => {
          localStorage.removeItem('currentUser')
          setUser(null)
        }}
        className="fixed top-4 right-4 bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  )
}
