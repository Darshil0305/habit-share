import HabitCard from './HabitCard'

export default function HabitList({ habits }) {
  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  )
}
