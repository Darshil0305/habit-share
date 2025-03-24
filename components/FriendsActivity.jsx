export default function FriendsActivity() {
  const activities = [
    { name: 'Alice', action: 'completed "Meditation"', time: '2h ago' },
    { name: 'Bob', action: 'started "Running"', time: '5h ago' },
    { name: 'Charlie', action: 'reached 7-day streak', time: '1d ago' },
    { name: 'Dana', action: 'shared a new habit', time: '2d ago' },
  ]

  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Friends Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-xs font-bold">
              {activity.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.name}</span> {activity.action}
              </p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
