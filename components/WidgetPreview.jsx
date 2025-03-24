import { motion } from 'framer-motion'

export default function WidgetPreview() {
  return (
    <motion.div 
      className="glass-effect p-6 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-4">Widget Preview</h2>
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-surface">
          <div className="flex items-center justify-between">
            <span>Daily Meditation</span>
            <span className="text-primary">🔥 5</span>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-surface">
          <div className="flex items-center justify-between">
            <span>Morning Run</span>
            <span className="text-primary">🔥 3</span>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-surface">
          <div className="flex items-center justify-between">
            <span>Water Intake</span>
            <span className="text-primary">🔥 7</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
