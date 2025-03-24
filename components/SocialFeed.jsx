import { useState, useEffect } from 'react'
import HabitCard from './HabitCard'
import UserProfile from './UserProfile'
import AuthForm from './AuthForm'

export default function SocialFeed() {
  const [feedItems, setFeedItems] = useState([])
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  useEffect(() => {
    const mockFeed = [
      {
        id: 1,
        userId: 'user1',
        name: 'Morning Run',
        streak: 42,
        likes: 15,
        comments: ['Great job!', 'Keep it up!'],
        timestamp: '2h ago'
      },
      {
        id: 2,
        userId: 'user2',
        name: 'Meditation',
        streak: 28,
        likes: 8,
        comments: ['Namaste 🙏'],
        timestamp: '5h ago'
      }
    ]
    setFeedItems(mockFeed)
  }, [])

  const toggleAuth = (mode) => {
    setAuthMode(mode)
    setShowAuth(!showAuth)
  }

  const handleLike = (id) => {
    const updatedFeed = feedItems.map(item => {
      if (item.id === id) {
        return { ...item, likes: (item.likes || 0) + 1 }
      }
      return item
    })
    setFeedItems(updatedFeed)
  }

  const handleComment = (id) => {
    const comment = prompt('Enter your comment:')
    if (!comment) return
    
    const updatedFeed = feedItems.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          comments: [...(item.comments || []), comment] 
        }
      }
      return item
    })
    setFeedItems(updatedFeed)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center mb-8">
        <button 
          onClick={() => toggleAuth('login')}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
        >
          Sign In
        </button>
        <button 
          onClick={() => toggleAuth('signup')}
          className="px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary/10 transition-all"
        >
          Join Community
        </button>
      </div>

      {showAuth && (
        <div className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10">
          <AuthForm mode={authMode} />
        </div>
      )}

      {feedItems.length > 0 ? (
        feedItems.map((item) => (
          <div key={item.id} className="backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 overflow-hidden transition-all hover:border-primary/30">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                <div>
                  <p className="font-medium">User {item.userId}</p>
                  <p className="text-sm text-gray-400">{item.timestamp}</p>
                </div>
              </div>
              
              <HabitCard habit={item} />
              
              <div className="mt-6 flex gap-4">
                <button 
                  onClick={() => handleLike(item.id)} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                >
                  <span>👍</span>
                  <span>{item.likes || 0}</span>
                </button>
                <button 
                  onClick={() => handleComment(item.id)} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                >
                  <span>💬</span>
                  <span>Comment</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all">
                  <span>↗️</span>
                  <span>Share</span>
                </button>
              </div>
              
              {item.comments && item.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h4 className="font-medium mb-2">Comments</h4>
                  <div className="space-y-3">
                    {item.comments.map((comment, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/10"></div>
                        <div className="text-sm bg-white/5 rounded-lg px-3 py-2">
                          {comment}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <div className="text-2xl mb-2">🌌</div>
          <h3 className="text-xl font-medium mb-1">Feed is empty</h3>
          <p className="text-gray-400">Be the first to share your habits!</p>
        </div>
      )}
    </div>
  )
}
