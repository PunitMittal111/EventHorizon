import React, { useState, useRef, useEffect } from "react";
import { Calendar, Menu, X, User, Settings, LogOut, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";

interface NavbarProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { organization } = useAuth();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsProfileMenuOpen(false);

      dispatch(logout());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(false);
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    setIsProfileMenuOpen(false);
    navigate("/settings");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <div className="flex items-center ml-4 lg:ml-0">
              <div className="flex-shrink-0 flex items-center">
                <Calendar className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  EventHorizon
                </span>
              </div>

              {organization && (
                <div className="ml-4 pl-4 border-l border-gray-200">
                  <span className="text-sm font-medium text-gray-900">
                    {organization.name}
                  </span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {organization.subscriptionPlan}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <Bell className="h-6 w-6" />
            </button>

            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={
                    user?.avatar ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                  alt="Profile"
                />
                <span className="hidden md:block font-medium text-gray-900">
                  {user ? user.name : "User"}
                </span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </button>
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors duration-150"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
