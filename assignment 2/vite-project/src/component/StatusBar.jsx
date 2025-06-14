import React from 'react'

const StatusBar = ({totalCount,completedCount}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
              <div className="text-sm text-gray-500">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{totalCount - completedCount}</div>
              <div className="text-sm text-gray-500">Remaining</div>
            </div>
          </div>
        </div>
  )
}

export default StatusBar