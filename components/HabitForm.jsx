import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'

export default function HabitForm({ setHabits }) {
  const [habit, setHabit] = useState('')
  const [frequency, setFrequency] = useState('daily')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!habit.trim()) return

    const newHabit = {
      name: habit,
      frequency,
      streak: 0,
      completed: false,
      createdAt: new Date(),
    }

    const docRef = await addDoc(collection(db, 'habits'), newHabit)
    setHabits((prev) => [...prev, { id: docRef.id, ...newHabit }])
    setHabit('')
  }

  return (
    <form onSubmit={handleSubmit} className="glass-effect p-6 rounded-lg mb-8">
      <div className="space-y-4">
        <input
          type="text"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          placeholder="Enter a new habit"
          className="w-full p-2 rounded bg-surface text-white"
        />
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full p-2 rounded bg-surface text-white"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="custom">Custom</option>
        </select>
        <button
          type="submit"
          className="w-full p-2 rounded bg-primary text-black font-bold"
        >
          Add Habit
        </button>
      </div>
    </form>
  )
}
