import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRouter";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";

const DashboardPage = React.lazy(
  () => import("./components/Dashboard/DashboardOverview")
);
const EventListPage = React.lazy(() => import("./components/Events/EventList"));
const VenueManagerPage = React.lazy(
  () => import("./components/Venue/VenueManager")
);
const EventWorkflow = React.lazy(
  () => import("./components/Workflow/EventWorkflow")
);
const TicketManagementPage = React.lazy(
  () => import("./components/Tickets/TicketManagement")
);
const AnalyticsPage = React.lazy(
  () => import("./components/Analytics/AnalyticsDashboard")
);
const BrandingSettingsPage = React.lazy(
  () => import("./components/Branding/BrandingSettings")
);

function AppContent() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className="flex">
        {!hideLayout && <Sidebar />}
        <div className="flex-1 overflow-auto bg-gray-50 p-6">
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-indigo-600">Loading...</div>
              </div>
            }
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/events"
                element={
                  <ProtectedRoute>
                    <EventListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/venues"
                element={
                  <ProtectedRoute>
                    <VenueManagerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workflow"
                element={
                  <ProtectedRoute>
                    <EventWorkflow />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tickets"
                element={
                  <ProtectedRoute>
                    <TicketManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/branding"
                element={
                  <ProtectedRoute>
                    <BrandingSettingsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
