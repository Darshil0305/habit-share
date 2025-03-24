import React from 'react'

export default function WidgetPreview() {
  return (
    <div className="glass-effect p-6 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Widget Preview</h3>
      <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center">
        <p className="text-sm text-white/50">Widget will appear here</p>
      </div>
    </div>
  )
}
