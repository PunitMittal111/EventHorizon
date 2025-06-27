import React from 'react';
import { Calendar, Users, DollarSign, TrendingUp, Eye, Ticket } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const stats = [
    {
      title: 'Total Events',
      value: '24',
      change: '+12%',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Attendees',
      value: '3,247',
      change: '+18%',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Revenue',
      value: '$45,680',
      change: '+25%',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'Conversion Rate',
      value: '12.4%',
      change: '+3.2%',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const recentEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: '2024-03-15',
      attendees: 450,
      revenue: '$12,500',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Digital Marketing Summit',
      date: '2024-03-10',
      attendees: 320,
      revenue: '$8,900',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Startup Pitch Night',
      date: '2024-03-08',
      attendees: 180,
      revenue: '$3,200',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex space-x-3">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Create Event
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Events</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentEvents.map((event) => (
            <div key={event.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Calendar className="h-10 w-10 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{event.attendees} attendees</p>
                    <p className="text-sm text-gray-500">{event.revenue}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    event.status === 'upcoming' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Quick Event</h3>
              <p className="text-purple-100">Create an event in 2 minutes</p>
            </div>
            <Eye className="h-8 w-8 text-purple-200" />
          </div>
          <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50 transition-colors">
            Get Started
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Bulk Tickets</h3>
              <p className="text-blue-100">Upload attendee list</p>
            </div>
            <Ticket className="h-8 w-8 text-blue-200" />
          </div>
          <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
            Upload CSV
          </button>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Analytics</h3>
              <p className="text-green-100">View detailed reports</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
          <button className="mt-4 bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;