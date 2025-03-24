import SocialFeed from '../components/SocialFeed'

export default function SocialPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Social Feed</h1>
        <SocialFeed />
      </div>
    </div>
  )
}
