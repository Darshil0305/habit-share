import { useState, useEffect } from 'react'

export default function UserProfile({ userId }) {
  const [profile, setProfile] = useState(null)
  const currentUser = localStorage.getItem('currentUser')

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {}
    if (users[userId]) {
      setProfile(users[userId])
    }
  }, [userId])

  const handleFollow = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {}
    if (users[userId]) {
      users[userId].followers = [...(users[userId].followers || []), currentUser]
      localStorage.setItem('users', JSON.stringify(users))
      setProfile(users[userId])
    }
  }

  return (
    <div className="glass-effect p-6 rounded-lg">
      {profile ? (
        <>
          <div className="flex items-center gap-4">
            <img 
              src={profile.photoURL || '/default-avatar.png'} 
              alt={profile.displayName || 'User'}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{profile.displayName || 'Anonymous'}</h2>
              <p className="text-gray-400">{profile.bio || 'No bio available'}</p>
              <div className="flex gap-4 mt-2">
                <span className="text-sm">Followers: {profile.followers?.length || 0}</span>
                <span className="text-sm">Following: {profile.following?.length || 0}</span>
              </div>
            </div>
          </div>
          {currentUser && currentUser !== userId && (
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleFollow}
                className="px-4 py-2 rounded bg-primary"
              >
                Follow
              </button>
              <button className="px-4 py-2 rounded bg-blue-500">Message</button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500">Profile not found.</div>
      )}
    </div>
  )
}
