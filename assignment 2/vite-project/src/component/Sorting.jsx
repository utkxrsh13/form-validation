import React from 'react'
import { Plus, Trash2, Check, Circle, Edit2, Save, X, ArrowUpDown } from 'lucide-react';


const Sorting = ({tasks,setSortBy,sortBy}) => {

   if (tasks.length <= 1) return null;

  return (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-gray-600">
                <ArrowUpDown size={18} />
                <span className="font-medium">Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="completed">Completed First</option>
                <option value="pending">Pending First</option>
              </select>
            </div>
          </div>
  )
}

export default Sorting