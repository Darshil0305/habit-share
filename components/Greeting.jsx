import { motion } from 'framer-motion'

export default function Greeting({ name = 'User' }) {
  const hour = new Date().getHours()
  let greeting = 'Hello'
  
  if (hour < 12) greeting = 'Good morning'
  else if (hour < 18) greeting = 'Good afternoon'
  else greeting = 'Good evening'

  const greetingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2,
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={greetingVariants}
      className="mb-6"
    >
      <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {greeting},
        </motion.span>{' '}
        <motion.span
          className="text-white"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          {name}!
        </motion.span>
      </h1>
      <motion.p 
        className="text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {getTimeMessage(hour)}
      </motion.p>
    </motion.div>
  )
}

function getTimeMessage(hour) {
  if (hour < 5) return 'Early bird catches the worm!'
  if (hour < 12) return 'Perfect time to start new habits!'
  if (hour < 15) return 'Keep up the good work!'
  if (hour < 18) return 'Afternoon is great for consistency!'
  if (hour < 22) return 'Evening reflections help growth!'
  return 'Rest well to recharge for tomorrow!'
}
