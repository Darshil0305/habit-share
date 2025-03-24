import { useState } from 'react'
import HabitForm from '../components/HabitForm'
import HabitList from '../components/HabitList'
import WidgetPreview from '../components/WidgetPreview'

export default function Home() {
  const [habits, setHabits] = useState([])

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Habit Tracker</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <HabitForm setHabits={setHabits} />
            <HabitList habits={habits} />
          </div>
          <WidgetPreview />
        </div>
      </div>
    </div>
  )
}
