'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getCompletions, getAchievements } from '../lib/db'

const achievementData = {
  '3-day-streak': { name: '3 Day Streak', description: 'Maintained a habit for 3 consecutive days', icon: '🔥' },
  '7-day-streak': { name: '7 Day Streak', description: 'Maintained a habit for 7 consecutive days', icon: '🚀' },
  'first-habit': { name: 'First Habit', description: 'Created your first habit', icon: '🎯' },
  'perfect-week': { name: 'Perfect Week', description: 'Completed all habits for a week', icon: '⭐' }
}

export default function StatsPanel({ habits }: { habits: any[] }) {
  const [completions, setCompletions] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      const allCompletions = await Promise.all(
        habits.map(habit => getCompletions(habit.id))
      )
      setCompletions(allCompletions.flat())
      setLoading(false)
    }
    loadStats()
  }, [habits])

  const calculateStreaks = () => {
    const streaks: Record<string, number> = {}
    habits.forEach(habit => {
      streaks[habit.id] = habit.streak || 0
    })
    return streaks
  }

  const streaks = calculateStreaks()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-gray-800/50 backdrop-blur-md border border-gray-700"
        >
          <h3 className="text-sm font-medium text-gray-400">Total Habits</h3>
          <p className="text-3xl font-bold mt-2">{habits.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-gray-800/50 backdrop-blur-md border border-gray-700"
        >
          <h3 className="text-sm font-medium text-gray-400">Total Completions</h3>
          <p className="text-3xl font-bold mt-2">{completions.length}</p>
        </motion.div>
      </div>

      <div className="p-4 rounded-xl bg-gray-800/50 backdrop-blur-md border border-gray-700">
        <h3 className="text-lg font-bold mb-4">Current Streaks</h3>
        {habits.length > 0 ? (
          <div className="space-y-3">
            {habits.map((habit, i) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-center justify-between"
              >
                <span>{habit.name}</span>
                <span className={`font-medium ${streaks[habit.id] >= 3 ? 'text-green-400' : ''}`}>
                  {streaks[habit.id]} day{streaks[habit.id] !== 1 ? 's' : ''}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No habits yet</p>
        )}
      </div>

      <div className="p-4 rounded-xl bg-gray-800/50 backdrop-blur-md border border-gray-700">
        <h3 className="text-lg font-bold mb-4">Achievements</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(achievementData).map(([key, achievement], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="p-3 rounded-lg bg-gray-700/50 flex items-center space-x-3"
            >
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <h4 className="font-medium">{achievement.name}</h4>
                <p className="text-xs text-gray-400">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
