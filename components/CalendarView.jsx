import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()
const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay()

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function CalendarView({ friendActivities = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [direction, setDirection] = useState(0)
  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()
  
  const days = daysInMonth(month, year)
  const firstDay = firstDayOfMonth(month, year)
  
  const getActivitiesForDay = (day) => {
    return friendActivities.filter(activity => {
      const activityDate = new Date(activity.date)
      return (
        activityDate.getDate() === day &&
        activityDate.getMonth() === month &&
        activityDate.getFullYear() === year
      )
    })
  }

  const navigateMonth = (dir) => {
    setDirection(dir)
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + dir)
      return newDate
    })
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  }

  return (
    <motion.div 
      className="glass-effect rounded-2xl p-6 shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.button>
        
        <AnimatePresence custom={direction} mode="wait">
          <motion.h3 
            key={`${month}-${year}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
          >
            {monthNames[month]} {year}
          </motion.h3>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-300">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(firstDay).fill(null).map((_, i) => (
          <div key={`empty-${i}`} className="h-12" />
        ))}

        {Array(days).fill(null).map((_, i) => {
          const day = i + 1
          const activities = getActivitiesForDay(day)
          const isToday = (
            day === new Date().getDate() && 
            month === new Date().getMonth() && 
            year === new Date().getFullYear()
          )

          return (
            <motion.div
              key={day}
              whileHover={{ scale: 1.05 }}
              className={`h-12 rounded-lg flex flex-col items-center justify-center relative 
                ${isToday ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/50' : ''}`}
            >
              <span className={`text-sm ${isToday ? 'font-bold text-white' : 'text-gray-300'}`}>
                {day}
              </span>
              {activities.length > 0 && (
                <div className="absolute -bottom-1 flex space-x-1">
                  {activities.slice(0, 3).map((activity, idx) => (
                    <motion.div
                      key={idx}
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 shadow-sm"
                      whileHover={{ scale: 1.5 }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 space-y-3">
        <h4 className="font-medium text-white/80">Today's Activities</h4>
        {getActivitiesForDay(new Date().getDate()).length > 0 ? (
          <ul className="text-sm space-y-2">
            {getActivitiesForDay(new Date().getDate()).map((activity, i) => (
              <motion.li 
                key={i} 
                className="flex items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                whileHover={{ x: 2 }}
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 mr-2"></div>
                <span className="text-white/90">
                  <span className="font-medium text-indigo-300">{activity.friend}</span> completed <span className="text-purple-300">{activity.habit}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <motion.p 
            className="text-sm text-gray-400 p-2 rounded-lg bg-white/5"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            No activities today
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
