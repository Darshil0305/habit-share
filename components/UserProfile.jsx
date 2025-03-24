export default function UserProfile() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold">
          JD
        </div>
        <div>
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-gray-400">42 day streak</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold">15</p>
          <p className="text-sm text-gray-400">Habits</p>
        </div>
        <div>
          <p className="text-2xl font-bold">8</p>
          <p className="text-sm text-gray-400">Friends</p>
        </div>
        <div>
          <p className="text-2xl font-bold">87%</p>
          <p className="text-sm text-gray-400">Success</p>
        </div>
      </div>
    </div>
  )
}
