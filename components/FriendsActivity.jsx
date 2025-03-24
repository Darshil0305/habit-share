import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

const emojiReactions = ['👍', '❤️', '🔥', '🎉', '👏']

export default function FriendsActivity({ activities }) {
  const [reactedItems, setReactedItems] = useState({})

  const getActionIcon = (action) => {
    switch(action) {
      case 'completed': return '✅'
      case 'started': return '✨'
      case 'extended': return '🔥'
      default: return '👋'
    }
  }

  const handleReaction = (id, emoji) => {
    setReactedItems(prev => ({
      ...prev,
      [id]: emoji
    }))
  }

  const getRandomColor = () => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-teal-500',
      'from-yellow-500 to-orange-500',
      'from-red-500 to-pink-500'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Friends Activity</h2>
        <Link href="/social" className="text-sm text-primary hover:underline">
          View All
        </Link>
      </div>

      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map(activity => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg transition-all group"
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getRandomColor()} flex items-center justify-center text-xs`}>
                {activity.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.name}</span>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
                <p className="text-sm">
                  {getActionIcon(activity.action)} {activity.action} "{activity.habit}" (streak: {activity.streak})
                </p>
                
                <motion.div 
                  className="mt-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                >
                  {emojiReactions.map(emoji => (
                    <motion.button
                      key={emoji}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleReaction(activity.id, emoji)}
                      className={`text-lg p-1 rounded-full ${reactedItems[activity.id] === emoji ? 'bg-primary/20' : 'hover:bg-white/10'}`}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </motion.div>
                {reactedItems[activity.id] && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xs mt-1 text-gray-400"
                  >
                    You reacted {reactedItems[activity.id]}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center py-6"
        >
          <p className="text-gray-400">No recent activity from friends</p>
          <Link href="/social" className="text-primary text-sm hover:underline mt-2 inline-block">
            Connect with friends
          </Link>
        </motion.div>
      )}
    </div>
  )
}
