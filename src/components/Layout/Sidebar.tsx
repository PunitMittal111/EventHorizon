import React from 'react';
import { 
  Home, 
  Calendar, 
  Ticket, 
  BarChart3, 
  Settings, 
  CreditCard, 
  Users, 
  Palette,
  Zap,
  MapPin,
  GitBranch
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileMenuOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isMobileMenuOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'venues', label: 'Venues', icon: MapPin },
    { id: 'workflow', label: 'Workflow', icon: GitBranch },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'attendees', label: 'Attendees', icon: Users },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className={`${
      isMobileMenuOpen ? 'block' : 'hidden'
    } lg:block lg:flex-shrink-0`}>
      <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
        <div className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`${
                    isActive
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center w-full px-3 py-2 text-sm font-medium border-l-4 transition-colors duration-200`}
                >
                  <Icon
                    className={`${
                      isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5`}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar