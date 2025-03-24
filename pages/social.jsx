import SocialFeed from '../components/SocialFeed'
import CalendarView from '../components/CalendarView'
import FriendsActivity from '../components/FriendsActivity'

const mockFriendActivities = [
  { friend: 'Alice', habit: 'Meditation', date: new Date().toISOString() },
  { friend: 'Bob', habit: 'Running', date: new Date().toISOString() },
  { friend: 'Charlie', habit: 'Reading', date: new Date(Date.now() - 86400000).toISOString() },
  { friend: 'Dana', habit: 'Coding', date: new Date(Date.now() - 2 * 86400000).toISOString() },
  { friend: 'Eve', habit: 'Yoga', date: new Date(Date.now() - 3 * 86400000).toISOString() },
]

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Community Feed
          </h1>
          <SocialFeed />
        </div>
        <div className="space-y-6">
          <CalendarView friendActivities={mockFriendActivities} />
          <FriendsActivity />
        </div>
      </div>
    </div>
  )
}
