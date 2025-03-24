import { useState } from 'react'

export default function HabitForm({ setHabits }) {
  const [habit, setHabit] = useState('')
  const [frequency, setFrequency] = useState('daily')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!habit.trim()) return

    const newHabit = {
      id: Date.now(),
      name: habit,
      frequency,
      streak: 0,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setHabits(prev => [...prev, newHabit])
    setHabit('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Add New Habit</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          placeholder="What habit do you want to build?"
          className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
        >
          Add Habit
        </button>
      </div>
    </form>
  )
}
