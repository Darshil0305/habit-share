import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import HabitCard from './HabitCard'
import UserProfile from './UserProfile'
import AuthForm from './AuthForm'

export default function SocialFeed({ userId }) {
  const [feedItems, setFeedItems] = useState([])
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  useEffect(() => {
    const q = query(
      collection(db, 'habits'),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc')
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = []
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() })
      })
      setFeedItems(items)
    })
    return () => unsubscribe()
  }, [userId])

  const toggleAuth = (mode) => {
    setAuthMode(mode)
    setShowAuth(!showAuth)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-center">
        <button 
          onClick={() => toggleAuth('login')}
          className="bg-primary px-4 py-2 rounded"
        >
          Login
        </button>
        <button 
          onClick={() => toggleAuth('signup')}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Sign Up
        </button>
      </div>

      {showAuth && <AuthForm mode={authMode} />}

      {feedItems.map((item) => (
        <div key={item.id} className="glass-effect p-4 rounded-lg">
          <UserProfile userId={item.userId} />
          <HabitCard habit={item} />
          <div className="mt-4 flex gap-4">
            <button className="bg-blue-500 px-3 py-1 rounded">Like</button>
            <button className="bg-purple-500 px-3 py-1 rounded">Comment</button>
            <button className="bg-pink-500 px-3 py-1 rounded">Share</button>
          </div>
        </div>
      ))}
    </div>
  )
}
