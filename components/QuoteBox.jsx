import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const quotes = [
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Small daily improvements are the key to staggering long-term results.",
    author: "Robin Sharma"
  },
  {
    text: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun"
  },
  {
    text: "First forget inspiration. Habit is more dependable.",
    author: "Octavia Butler"
  }
]

export default function QuoteBox() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      setCurrentQuote(quotes[randomIndex])
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const quoteVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { opacity: 0, y: -10 }
  }

  return (
    <motion.div 
      className="glass-effect rounded-xl p-6 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <motion.blockquote 
        className="text-lg italic mb-2"
        key={`quote-${currentQuote.text}`}
        variants={quoteVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        "{currentQuote.text}"
      </motion.blockquote>
      <motion.p 
        className="text-right text-indigo-400"
        key={`author-${currentQuote.author}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        - {currentQuote.author}
      </motion.p>
    </motion.div>
  )
}
