import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import DashboardOverview from './components/Dashboard/DashboardOverview';
import EventList from './components/Events/EventList';
import VenueManager from './components/Events/VenueManager';
import EventWorkflow from './components/Events/EventWorkflow';
import AdvancedTicketManagement from './components/Tickets/AdvancedTicketManagement';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import BrandingSettings from './components/Settings/BrandingSettings';
import { Event } from './types';

const MainApp: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const handleEventStatusChange = (eventId: string, status: Event['status']) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, status, updatedAt: new Date() }
          : event
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'events':
        return <EventList />;
      case 'venues':
        return <VenueManager />;
      case 'workflow':
        return <EventWorkflow events={events} onStatusChange={handleEventStatusChange} />;
      case 'tickets':
        return <AdvancedTicketManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'attendees':
        return <div className="p-6 text-center text-gray-500">Attendees management coming soon...</div>;
      case 'branding':
        return <BrandingSettings />;
      case 'billing':
        return <div className="p-6 text-center text-gray-500">Billing management coming soon...</div>;
      case 'integrations':
        return <div className="p-6 text-center text-gray-500">Integrations coming soon...</div>;
      case 'settings':
        return <div className="p-6 text-center text-gray-500">Settings coming soon...</div>;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex">
        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;