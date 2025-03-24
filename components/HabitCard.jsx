import React from 'react'
import { motion } from 'framer-motion'

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      type: 'spring',
      stiffness: 300,
      damping: 10
    }
  })
}

const wordVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1 + 0.3,
      duration: 0.5
    }
  })
}

export default function HabitCard({ habit = {} }) {
  const { 
    title = 'New Habit', 
    description = 'No description provided', 
    streak = 0,
    deadline
  } = habit

  const daysUntilDeadline = deadline ? 
    Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)) : 
    null

  return (
    <motion.div 
      className="p-5 rounded-2xl glass-effect hover:shadow-glow-primary transition-all relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-30 -z-10"></div>
      
      {deadline && (
        <motion.div 
          className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold shadow-md
            ${daysUntilDeadline <= 0 ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
              daysUntilDeadline <= 3 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 
              'bg-gradient-to-r from-green-500 to-emerald-500'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          {daysUntilDeadline <= 0 ? 'Overdue' : `${daysUntilDeadline}d left`}
        </motion.div>
      )}
      
      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
        {title.split('').map((letter, i) => (
          <motion.span 
            key={i} 
            className="letter-box inline-block"
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            {letter}
          </motion.span>
        ))}
      </h3>
      <p className="text-sm text-white/80 mb-4">
        {description.split(' ').map((word, i) => (
          <motion.span 
            key={i} 
            className="inline-block"
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            {word}{' '}
          </motion.span>
        ))}
      </p>
      <div className="flex justify-between items-center">
        <motion.div 
          className="flex gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div 
              key={i} 
              className={`w-2.5 h-2.5 rounded-full ${i < streak ? 'bg-gradient-to-r from-indigo-400 to-purple-500' : 'bg-white/10'}`}
              whileHover={{ scale: 1.5 }}
              transition={{ type: 'spring', stiffness: 500 }}
            />
          ))}
        </motion.div>
        {deadline && (
          <span className="text-xs text-white/60">
            Due: {new Date(deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>
    </motion.div>
  )
}
