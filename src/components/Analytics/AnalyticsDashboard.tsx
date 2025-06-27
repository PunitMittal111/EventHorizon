import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  DollarSign, 
  Calendar,
  MapPin,
  Share2
} from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Total Page Views',
      value: '15,247',
      change: '+12.5%',
      trend: 'up',
      icon: Eye
    },
    {
      title: 'Unique Visitors',
      value: '8,432',
      change: '+8.3%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-0.8%',
      trend: 'down',
      icon: TrendingUp
    },
    {
      title: 'Revenue',
      value: '$42,680',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign
    }
  ];

  const topEvents = [
    {
      name: 'Tech Conference 2024',
      views: 4280,
      revenue: '$15,400',
      conversion: '4.2%'
    },
    {
      name: 'Digital Marketing Summit',
      views: 3150,
      revenue: '$8,900',
      conversion: '2.8%'
    },
    {
      name: 'Startup Pitch Night',
      views: 2840,
      revenue: '$3,200',
      conversion: '1.9%'
    }
  ];

  const trafficSources = [
    { source: 'Direct', visitors: 3420, percentage: 40.5 },
    { source: 'Social Media', visitors: 2150, percentage: 25.4 },
    { source: 'Email', visitors: 1680, percentage: 19.9 },
    { source: 'Search', visitors: 1182, percentage: 14.2 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendIcon className={`h-4 w-4 mr-1 ${
                      metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-indigo-50 rounded-full">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Performing Events</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{event.name}</h4>
                    <p className="text-sm text-gray-500">{event.views} views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{event.revenue}</p>
                    <p className="text-sm text-gray-500">{event.conversion} conversion</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Traffic Sources</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <Share2 className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{source.source}</h4>
                      <p className="text-sm text-gray-500">{source.visitors} visitors</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{source.percentage}%</p>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Revenue Trends</h3>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would go here</p>
              <p className="text-sm text-gray-400">Integration with Chart.js or similar library</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;