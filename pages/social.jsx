import SocialFeed from '../components/SocialFeed'

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Community Feed
        </h1>
        <SocialFeed />
      </div>
    </div>
  )
}
