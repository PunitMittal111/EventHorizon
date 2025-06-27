import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Organization } from '../types';

interface AuthContextType {
  user: User | null;
  organization: Organization | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, orgName: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user from localStorage or API
    const storedUser = localStorage.getItem('user');
    const storedOrg = localStorage.getItem('organization');
    
    if (storedUser && storedOrg) {
      setUser(JSON.parse(storedUser));
      setOrganization(JSON.parse(storedOrg));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock authentication
    const mockUser: User = {
      id: '1',
      email,
      name: 'John Doe',
      role: 'org_admin',
      organizationId: 'org-1',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    };

    const mockOrg: Organization = {
      id: 'org-1',
      name: 'TechEvents Pro',
      slug: 'techevents-pro',
      primaryColor: '#8B5CF6',
      secondaryColor: '#3B82F6',
      subscriptionPlan: 'premium',
      isActive: true,
      createdAt: new Date(),
      settings: {
        allowCustomDomain: true,
        maxEvents: 100,
        maxTicketsPerEvent: 1000,
        customBranding: true
      }
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('organization', JSON.stringify(mockOrg));
    
    setUser(mockUser);
    setOrganization(mockOrg);
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string, orgName: string) => {
    setIsLoading(true);
    
    // Mock registration
    const mockUser: User = {
      id: '1',
      email,
      name,
      role: 'org_admin',
      organizationId: 'org-1',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    };

    const mockOrg: Organization = {
      id: 'org-1',
      name: orgName,
      slug: orgName.toLowerCase().replace(/\s+/g, '-'),
      primaryColor: '#8B5CF6',
      secondaryColor: '#3B82F6',
      subscriptionPlan: 'basic',
      isActive: true,
      createdAt: new Date(),
      settings: {
        allowCustomDomain: false,
        maxEvents: 10,
        maxTicketsPerEvent: 100,
        customBranding: false
      }
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('organization', JSON.stringify(mockOrg));
    
    setUser(mockUser);
    setOrganization(mockOrg);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('organization');
    setUser(null);
    setOrganization(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      organization,
      login,
      logout,
      register,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};