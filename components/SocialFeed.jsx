export default function SocialFeed() {
  const posts = [
    {
      id: 1,
      user: 'Alice',
      content: 'Just completed my 30-day meditation streak! 🎉',
      likes: 12,
      comments: 3,
      time: '2h ago',
    },
    {
      id: 2,
      user: 'Bob',
      content: 'Day 7 of my running challenge. Feeling great! 🏃‍♂️',
      likes: 8,
      comments: 1,
      time: '5h ago',
    },
  ]

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
              {post.user.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold">{post.user}</h3>
              <p className="text-xs text-gray-400">{post.time}</p>
            </div>
          </div>
          <p className="mb-4">{post.content}</p>
          <div className="flex space-x-4 text-sm">
            <button className="flex items-center space-x-1 hover:text-indigo-400">
              <span>👍</span>
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-indigo-400">
              <span>💬</span>
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-indigo-400">
              <span>🔗</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
