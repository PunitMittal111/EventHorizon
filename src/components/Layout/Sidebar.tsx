import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Calendar, Ticket, CreditCard } from "lucide-react";

interface SidebarProps {
  isMobileMenuOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
    { id: "events", label: "Events", icon: Calendar, path: "/events" },
    { id: "tickets", label: "Tickets", icon: Ticket, path: "/tickets" },
    { id: "billing", label: "Billing", icon: CreditCard, path: "/billing" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className={`${
        isMobileMenuOpen ? "block" : "hidden"
      } lg:block lg:flex-shrink-0`}
    >
      <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
        <div className="flex-1 px-3 py-4">
          <nav className="space-y-1 fixed">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`${
                    isActive
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } group flex items-center w-full px-3 py-2 text-sm font-medium border-l-4 transition-colors duration-200`}
                >
                  <Icon
                    className={`${
                      isActive
                        ? "text-indigo-500"
                        : "text-gray-400 group-hover:text-gray-500"
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

export default Sidebar;
