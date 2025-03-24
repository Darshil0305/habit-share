import React from 'react'
import { motion } from 'framer-motion'

export default function HabitCard({ habit }) {
  return (
    <motion.div 
      className="p-4 border border-white/10 rounded-lg glass-effect hover:shadow-glow-primary transition-all"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-lg font-bold mb-2">
        {habit.title.split('').map((letter, i) => (
          <span key={i} className="letter-box text-pop">
            {letter}
          </span>
        ))}
      </h3>
      <p className="text-sm">
        {habit.description.split(' ').map((word, i) => (
          <span key={i} className="text-pop">
            {word}{' '}
          </span>
        ))}
      </p>
      <div className="mt-3 flex gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full ${i < habit.streak ? 'bg-primary' : 'bg-white/10'}`}
          />
        ))}
      </div>
    </motion.div>
  )
}
