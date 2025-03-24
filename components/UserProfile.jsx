import { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'

export default function UserProfile({ userId }) {
  const [profile, setProfile] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const currentUser = auth.currentUser

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'users', userId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setProfile(docSnap.data())
        if (currentUser && docSnap.data().followers?.includes(currentUser.uid)) {
          setIsFollowing(true)
        }
      }
    }
    fetchProfile()
  }, [userId, currentUser])

  const handleFollow = async () => {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      followers: [...(profile?.followers || []), currentUser.uid]
    })
    setIsFollowing(true)
  }

  return (
    <div className="glass-effect p-6 rounded-lg">
      {profile && (
        <>
          <div className="flex items-center gap-4">
            <img 
              src={profile.photoURL} 
              alt={profile.displayName}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{profile.displayName}</h2>
              <p className="text-gray-400">{profile.bio}</p>
              <div className="flex gap-4 mt-2">
                <span className="text-sm">Followers: {profile.followers?.length || 0}</span>
                <span className="text-sm">Following: {profile.following?.length || 0}</span>
              </div>
            </div>
          </div>
          {currentUser && currentUser.uid !== userId && (
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleFollow}
                className={`px-4 py-2 rounded ${
                  isFollowing ? 'bg-green-500' : 'bg-primary'
                }`}
                disabled={isFollowing}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button className="px-4 py-2 rounded bg-blue-500">Message</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
