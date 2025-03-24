import { motion } from 'framer-motion'

export default function HabitList({ habits, setHabits }) {
  const toggleComplete = (id) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id 
        ? { 
            ...habit, 
            completed: !habit.completed,
            streak: !habit.completed ? habit.streak + 1 : habit.streak
          } 
        : habit
    ))
  }

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(habit => habit.id !== id))
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <motion.div
          key={habit.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleComplete(habit.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${habit.completed ? 'bg-indigo-600 border-indigo-600' : 'border-gray-500'}`}
            >
              {habit.completed && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <div>
              <h3 className="font-medium">{habit.name}</h3>
              <p className="text-sm text-gray-400">
                {habit.frequency} • {habit.streak} day streak
              </p>
            </div>
          </div>
          <button
            onClick={() => deleteHabit(habit.id)}
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      ))}
    </div>
  )
}
