import { useState, useEffect } from 'react'
import HabitForm from '../components/HabitForm'
import HabitList from '../components/HabitList'
import WidgetPreview from '../components/WidgetPreview'
import Link from 'next/link'
import FriendsActivity from '../components/FriendsActivity'

export default function Home() {
  const [habits, setHabits] = useState([])
  const [friendsActivity, setFriendsActivity] = useState([])

  useEffect(() => {
    // Mock data for friends activity
    const mockActivity = [
      {
        id: 1,
        name: 'Alex',
        action: 'completed',
        habit: 'Morning Run',
        streak: 7,
        time: '2h ago'
      },
      {
        id: 2,
        name: 'Sam',
        action: 'started',
        habit: 'Meditation',
        streak: 1,
        time: '30m ago'
      },
      {
        id: 3,
        name: 'Jordan',
        action: 'extended',
        habit: 'Reading',
        streak: 21,
        time: '5h ago'
      }
    ]
    setFriendsActivity(mockActivity)
  }, [])

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Habit Tracker
        </h1>
        <div className="flex gap-4 mb-8">
          <Link href="/social" className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all">
            Social Feed
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <HabitForm setHabits={setHabits} />
            <HabitList habits={habits} />
          </div>
          <div className="space-y-8">
            <WidgetPreview />
            <FriendsActivity activities={friendsActivity} />
          </div>
        </div>
      </div>
    </div>
  )
}
