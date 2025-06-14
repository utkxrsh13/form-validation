import React from 'react'

const Footer = ({tasks, completedCount,totalCount}) => {

  if (tasks.length === 0) return null;

  return (
          <div className="text-center mt-6 text-gray-500 text-sm">
            {completedCount === totalCount 
              ? "🎉 All tasks completed! Great job!" 
              : `${totalCount - completedCount} task${totalCount - completedCount !== 1 ? 's' : ''} remaining`}
          </div>
  )
}

export default Footer