import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { 
  Calendar, CalendarDays, Users, TrendingUp, DollarSign, ShoppingCart,
  Sun, Moon, Settings, Bell, Search, Filter, Plus, Edit, Trash2,
  ChevronLeft, ChevronRight, MoreVertical, Layout, Home, BarChart3,
  User, Package, MessageSquare, FileText, LogOut, Menu
} from 'lucide-react';

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Sample data
  const [salesData] = useState([
    { month: 'Jan', sales: 4000, revenue: 2400, users: 240 },
    { month: 'Feb', sales: 3000, revenue: 1398, users: 220 },
    { month: 'Mar', sales: 2000, revenue: 9800, users: 290 },
    { month: 'Apr', sales: 2780, revenue: 3908, users: 200 },
    { month: 'May', sales: 1890, revenue: 4800, users: 180 },
    { month: 'Jun', sales: 2390, revenue: 3800, users: 250 }
  ]);

  const [pieData] = useState([
    { name: 'Desktop', value: 400, color: '#8884d8' },
    { name: 'Mobile', value: 300, color: '#82ca9d' },
    { name: 'Tablet', value: 200, color: '#ffc658' },
    { name: 'Other', value: 100, color: '#ff7c7c' }
  ]);

  const [tableData, setTableData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2024-02-20' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Manager', status: 'Inactive', joinDate: '2024-01-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', joinDate: '2024-03-05' }
  ]);

  const [kanbanData, setKanbanData] = useState({
    todo: [
      { id: 1, title: 'Design new landing page', description: 'Create wireframes and mockups', priority: 'High' },
      { id: 2, title: 'Setup analytics', description: 'Implement Google Analytics', priority: 'Medium' }
    ],
    inProgress: [
      { id: 3, title: 'API Integration', description: 'Connect frontend with backend', priority: 'High' },
      { id: 4, title: 'User Testing', description: 'Conduct usability tests', priority: 'Low' }
    ],
    done: [
      { id: 5, title: 'Database Setup', description: 'Configure production database', priority: 'High' },
      { id: 6, title: 'Authentication', description: 'Implement user login system', priority: 'Medium' }
    ]
  });

  const [calendarEvents] = useState([
    { date: 15, title: 'Team Meeting', time: '10:00 AM' },
    { date: 18, title: 'Product Launch', time: '2:00 PM' },
    { date: 22, title: 'Client Call', time: '11:30 AM' },
    { date: 25, title: 'Sprint Review', time: '3:00 PM' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const toggleTheme = () => setDarkMode(!darkMode);

  const themeClasses = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
  const cardClasses = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const inputClasses = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300';

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvent = calendarEvents.some(event => event.date === day);
      days.push(
        <div
          key={day}
          className={`h-10 flex items-center justify-center cursor-pointer rounded-lg transition-colors ${
            hasEvent 
              ? 'bg-blue-500 text-white' 
              : darkMode 
                ? 'hover:bg-gray-700' 
                : 'hover:bg-gray-100'
          }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // Kanban functions
  const moveCard = (cardId, from, to) => {
    const card = kanbanData[from].find(c => c.id === cardId);
    if (card) {
      setKanbanData(prev => ({
        ...prev,
        [from]: prev[from].filter(c => c.id !== cardId),
        [to]: [...prev[to], card]
      }));
    }
  };

  // Table functions
  const filteredTableData = tableData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const deleteUser = (id) => {
    setTableData(prev => prev.filter(user => user.id !== id));
  };

  const sidebar = (
    <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ${cardClasses} border-r h-screen flex flex-col`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && <h1 className="font-bold text-xl">AdminPro</h1>}
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {[
            { id: 'dashboard', icon: Home, label: 'Dashboard' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' },
            { id: 'users', icon: User, label: 'Users' },
            { id: 'calendar', icon: Calendar, label: 'Calendar' },
            { id: 'kanban', icon: Package, label: 'Projects' },
            { id: 'messages', icon: MessageSquare, label: 'Messages' },
            { id: 'reports', icon: FileText, label: 'Reports' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-500 text-white' 
                  : darkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  const header = (
    <div className={`${cardClasses} border-b px-6 py-4 flex items-center justify-between`}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className={`${inputClasses} pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} relative`}>
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Total Users', value: '12,543', change: '+12%', color: 'blue' },
          { icon: DollarSign, label: 'Revenue', value: '$45,210', change: '+8.2%', color: 'green' },
          { icon: ShoppingCart, label: 'Orders', value: '1,423', change: '+5.4%', color: 'purple' },
          { icon: TrendingUp, label: 'Growth', value: '23.5%', change: '+2.1%', color: 'orange' }
        ].map((stat, i) => (
          <div key={i} className={`${cardClasses} border rounded-xl p-6 hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 text-${stat.color}-500`}>{stat.change}</p>
              </div>
              <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${cardClasses} border rounded-xl p-6`}>
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={`${cardClasses} border rounded-xl p-6`}>
          <h3 className="text-lg font-semibold mb-4">Device Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: entry.color}}></div>
                <span className="text-sm">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`${cardClasses} border rounded-xl p-6`}>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { user: 'John Doe', action: 'created a new project', time: '2 hours ago' },
            { user: 'Jane Smith', action: 'updated user profile', time: '4 hours ago' },
            { user: 'Bob Wilson', action: 'completed task', time: '6 hours ago' }
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p><span className="font-medium">{activity.user}</span> {activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className={`${cardClasses} border rounded-xl p-6`}>
        <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} />
            <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${cardClasses} border rounded-xl p-6`}>
          <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`${cardClasses} border rounded-xl p-6`}>
          <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
          <div className="space-y-4">
            {[
              { label: 'Conversion Rate', value: '3.2%', trend: 'up' },
              { label: 'Bounce Rate', value: '45%', trend: 'down' },
              { label: 'Session Duration', value: '4:32', trend: 'up' },
              { label: 'Page Views', value: '125K', trend: 'up' }
            ].map((metric, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <span>{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{metric.value}</span>
                  <TrendingUp className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className={`${cardClasses} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${inputClasses} pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`${inputClasses} px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <Filter className="w-5 h-5 text-gray-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Email</th>
                <th className="text-left p-4 font-semibold">Role</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Join Date</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTableData.map(user => (
                <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{user.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.role === 'Admin' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      user.role === 'Manager' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{user.joinDate}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Calendar</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 ${cardClasses} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="h-10 flex items-center justify-center font-semibold text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {generateCalendar()}
          </div>
        </div>

        <div className={`${cardClasses} border rounded-xl p-6`}>
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {calendarEvents.map((event, i) => (
              <div key={i} className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500">
                <p className="font-semibold text-blue-800 dark:text-blue-200">{event.title}</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">{event.time}</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">Day {event.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderKanban = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Board</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(kanbanData).map(([status, cards]) => (
          <div key={status} className={`${cardClasses} border rounded-xl p-4`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold capitalize">
                {status === 'inProgress' ? 'In Progress' : status}
              </h3>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                status === 'todo' ? 'bg-gray-200 text-gray-800' :
                status === 'inProgress' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-200 text-green-800'
              }`}>
                {cards.length}
              </span>
            </div>

            <div className="space-y-3">
              {cards.map(card => (
                <div
                  key={card.id}
                  className={`p-4 rounded-lg cursor-move transition-all hover:shadow-md ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-white'
                  } border`}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('cardId', card.id.toString());
                    e.dataTransfer.setData('fromStatus', status);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{card.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      card.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      card.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {card.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{card.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Assigned</span>
                    </div>
                    <button className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600`}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`mt-4 p-4 border-2 border-dashed rounded-lg transition-colors ${
                darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const cardId = parseInt(e.dataTransfer.getData('cardId'));
                const fromStatus = e.dataTransfer.getData('fromStatus');
                if (fromStatus !== status) {
                  moveCard(cardId, fromStatus, status);
                }
              }}
            >
              <p className="text-sm text-gray-500 text-center">Drop cards here</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Messages</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" />
          New Message
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${cardClasses} border rounded-xl p-4`}>
          <h3 className="font-semibold mb-4">Conversations</h3>
          <div className="space-y-3">
            {[
              { name: 'John Doe', message: 'Hey, how is the project going?', time: '2m ago', unread: 2 },
              { name: 'Jane Smith', message: 'The designs look great!', time: '1h ago', unread: 0 },
              { name: 'Bob Wilson', message: 'Can we schedule a meeting?', time: '3h ago', unread: 1 },
              { name: 'Alice Brown', message: 'Thanks for the quick response', time: '1d ago', unread: 0 }
            ].map((chat, i) => (
              <div key={i} className={`p-3 rounded-lg cursor-pointer transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{chat.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{chat.name}</p>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{chat.message}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`lg:col-span-2 ${cardClasses} border rounded-xl p-4 flex flex-col`}>
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">J</span>
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>

          <div className="flex-1 py-4 space-y-4">
            <div className="flex justify-start">
              <div className={`max-w-xs px-4 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <p className="text-sm">Hey, how is the project going?</p>
                <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-blue-500 text-white">
                <p className="text-sm">It's going well! We're on track for the deadline.</p>
                <p className="text-xs text-blue-100 mt-1">2:32 PM</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className={`max-w-xs px-4 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <p className="text-sm">Great! Let me know if you need any help.</p>
                <p className="text-xs text-gray-500 mt-1">2:35 PM</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                className={`flex-1 ${inputClasses} px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reports</h2>
        <div className="flex items-center gap-3">
          <select className={`${inputClasses} px-4 py-2 rounded-lg border`}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
            <FileText className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${cardClasses} border rounded-xl p-6`}>
          <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
          <div className="space-y-4">
            {[
              { label: 'Total Revenue', value: '$45,210', change: '+12.5%', positive: true },
              { label: 'New Customers', value: '1,234', change: '+8.2%', positive: true },
              { label: 'Churn Rate', value: '2.1%', change: '-0.5%', positive: true },
              { label: 'Average Order Value', value: '$85.50', change: '+3.1%', positive: true }
            ].map((metric, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{metric.label}</p>
                  <p className="text-xl font-bold">{metric.value}</p>
                </div>
                <div className={`text-right ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
                  <p className="text-sm font-medium">{metric.change}</p>
                  <TrendingUp className="w-4 h-4 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${cardClasses} border rounded-xl p-6`}>
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Premium Plan', sales: 245, revenue: '$12,250' },
              { name: 'Basic Plan', sales: 189, revenue: '$9,450' },
              { name: 'Enterprise Plan', sales: 67, revenue: '$16,750' },
              { name: 'Starter Plan', sales: 156, revenue: '$4,680' }
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{product.sales} sales</p>
                </div>
                <p className="font-bold text-green-500">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${cardClasses} border rounded-xl p-6`}>
        <h3 className="text-lg font-semibold mb-4">Detailed Analytics</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="users" stroke="#ffc658" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'analytics': return renderAnalytics();
      case 'users': return renderUsers();
      case 'calendar': return renderCalendar();
      case 'kanban': return renderKanban();
      case 'messages': return renderMessages();
      case 'reports': return renderReports();
      default: return renderDashboard();
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>
      <div className="flex">
        {sidebar}
        
        <div className="flex-1 flex flex-col">
          {header}
          
          <main className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;