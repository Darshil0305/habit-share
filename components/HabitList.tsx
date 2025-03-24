'use client'
import { motion, AnimatePresence } from 'framer-motion'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 300,
      damping: 15
    }
  }),
  exit: { opacity: 0, x: 20 }
}

export default function HabitList({
  habits,
  onToggleComplete,
  onDelete
}: {
  habits: any[]
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {habits.map((habit, index) => (
          <motion.div
            key={habit.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 rounded-xl bg-gray-800/50 backdrop-blur-md border border-gray-700 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={() => onToggleComplete(habit.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${habit.completed ? 'bg-indigo-600 border-indigo-600' : 'border-gray-500'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {habit.completed && (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </motion.svg>
                )}
              </motion.button>
              <div>
                <h3 className="font-medium">{habit.name}</h3>
                <p className="text-sm text-gray-400">
                  {habit.frequency} • {habit.streak} day streak
                </p>
              </div>
            </div>
            <motion.button
              onClick={() => onDelete(habit.id)}
              className="text-gray-400 hover:text-red-400 transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
