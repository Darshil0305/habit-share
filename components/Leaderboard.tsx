'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getAchievements, addAchievement } from '../lib/db'

export default function Leaderboard({ user }: { user: string }) {
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAchievements = async () => {
      const loadedAchievements = await getAchievements(user)
      setAchievements(loadedAchievements)
      setLoading(false)
    }
    loadAchievements()
  }, [user])

  const handleAddAchievement = async () => {
    const newAchievement = {
      title: '7 Day Streak',
      description: 'Maintained a habit for 7 consecutive days',
      xp: 50,
      icon: '🏆'
    }
    await addAchievement(user, newAchievement)
    setAchievements([...achievements, newAchievement])
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Achievements</h2>
        <motion.button
          onClick={handleAddAchievement}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm"
        >
          Add Test Achievement
        </motion.button>
      </div>

      {achievements.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No achievements yet. Complete habits to earn rewards!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700"
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{achievement.icon}</div>
                <div>
                  <h3 className="font-bold">{achievement.title}</h3>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                  <div className="mt-2 text-xs text-indigo-400">
                    +{achievement.xp} XP
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
