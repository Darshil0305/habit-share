import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { motion } from 'framer-motion'

export default function HabitCard({ habit }) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleComplete = async () => {
    const today = new Date().toISOString().split('T')[0]
    const updatedDates = [...habit.completedDates, today]
    await updateDoc(doc(db, 'habits', habit.id), {
      completedDates: updatedDates,
      streak: habit.streak + 1,
      totalCompletions: habit.totalCompletions + 1
    })
    setIsCompleted(true)
  }

  const completionPercentage = Math.round(
    (habit.totalCompletions / (habit.streak || 1)) * 100
  )

  return (
    <motion.div
      className="glass-effect p-4 rounded-lg cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{habit.name}</h2>
        <span className="text-sm text-gray-400">{habit.frequency}</span>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <div className="w-full bg-surface rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm">{completionPercentage}%</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm">Streak: {habit.streak} days</p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleComplete()
            }}
            disabled={isCompleted}
            className={`px-4 py-2 rounded ${
              isCompleted ? 'bg-green-500' : 'bg-primary hover:bg-opacity-80'
            } text-black`}
          >
            {isCompleted ? 'Completed' : 'Complete'}
          </button>
        </div>
        {showDetails && (
          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap gap-2">
              {habit.tags?.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-surface rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm">Category: {habit.category}</p>
            <p className="text-sm">
              Total Completions: {habit.totalCompletions}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
