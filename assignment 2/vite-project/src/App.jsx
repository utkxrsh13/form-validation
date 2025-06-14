import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Trash2, Check, Circle, Edit2, Save, X, ArrowUpDown } from 'lucide-react';
import StatusBar from './component/StatusBar';
import Sorting from './component/Sorting';
import Footer from './component/Footer';
// import TaskList from './component/TaskList';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
  try {
    const storedTasks = localStorage.getItem('tasks');
    console.log('Loaded from localStorage:', storedTasks); // Add this
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  } catch (e) {
    console.error('Failed to load tasks from localStorage', e);
    setTasks([]);
  }
}, []);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toLocaleDateString()
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleComplete = (id) => {
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        ));
      };
    
      const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
      };
    
      const startEditing = (id, text) => {
        setEditingId(id);
        setEditText(text);
      };
    
      const saveEdit = () => {
        if (editText.trim() !== '') {
          setTasks(tasks.map(task => 
            task.id === editingId ? { ...task, text: editText.trim() } : task
          ));
        }
        setEditingId(null);
        setEditText('');
      };
    
      const cancelEdit = () => {
        setEditingId(null);
        setEditText('');
      };
  

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const sortedTasks = useMemo(() => {
    const tasksCopy = [...tasks];
    
    switch (sortBy) {
      case 'newest':
        return tasksCopy.sort((a, b) => b.id - a.id);
      case 'oldest':
        return tasksCopy.sort((a, b) => a.id - b.id);
      case 'alphabetical':
        return tasksCopy.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
      case 'completed':
        return tasksCopy.sort((a, b) => {
          if (a.completed === b.completed) return b.id - a.id;
          return a.completed ? -1 : 1; // Completed tasks first
        });
      case 'pending':
        return tasksCopy.sort((a, b) => {
          if (a.completed === b.completed) return b.id - a.id;
          return a.completed ? 1 : -1; // Pending tasks first
        });
      default:
        return tasksCopy;
    }
  }, [tasks, sortBy]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh'
    }} className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600">Stay organized and get things done</p>
        </div>

        {/* StatusBar */}
        <StatusBar totalCount={totalCount} completedCount={completedCount} />

        {/* Add Task Input */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addTask}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* Sorting Controls */}
        <Sorting tasks={tasks} setSortBy={setSortBy} sortBy={sortBy} />
        

        {/* Task List */}
       <div className="bg-white rounded-lg shadow-md">
          {tasks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Circle size={64} className="mx-auto opacity-30" />
              </div>
              <h3 className="text-xl font-medium text-gray-500 mb-2">No tasks yet</h3>
              <p className="text-gray-400">Add your first task above to get started!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sortedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 flex items-center gap-4 transition-all duration-200 ${
                    task.completed ? 'bg-gray-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {task.completed && <Check size={16} />}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    {editingId === task.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={handleEditKeyPress}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          autoFocus
                        />
                        <button
                          onClick={saveEdit}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="group">
                        <p className={`text-gray-800 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.text}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Created: {task.createdAt}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {editingId !== task.id && (
                      <button
                        onClick={() => startEditing(task.id, task.text)}
                        className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer tasks={tasks} completedCount={completedCount} totalCount={totalCount} />
      </div>
    </div>
  );
}