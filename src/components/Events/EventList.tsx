import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Edit,
  Plus,
  Filter,
  Search,
  Archive,
  Copy,
  Share2,
  Globe,
  Clock,
  Tag,
} from "lucide-react";
import EventCreationWizard from "./EventCreationWizard";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { getAllEvents } from "../../features/eventSlice";

const EventList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector((state) => state.events);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(
      getAllEvents({
        status: statusFilter,
        type: typeFilter,
        search: searchTerm,
      })
    );
  }, [dispatch, statusFilter, typeFilter, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "archived":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "virtual":
        return Globe;
      case "hybrid":
        return Users;
      default:
        return MapPin;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-1">Manage your event portfolio</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Event</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="in-person">In-Person</option>
              <option value="virtual">Virtual</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-6 text-gray-500">Loading events...</div>
      )}

      {error && (
        <div className="text-center py-6 text-red-500">Error: {error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => {
          const TypeIcon = getTypeIcon(event.eventType);
          const attendancePercentage =
            (event.currentAttendees / event.maxAttendees) * 100;

          return (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="relative">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      event.status
                    )}`}
                  >
                    {event.status}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800">
                    <TypeIcon className="h-3 w-3 mr-1" />
                    {event.eventType}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between px-6 ">
                <div className="flex items-center space-x-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: event.category[0]?.color,
                    }}
                  />
                  <span className="text-sm text-gray-600">
                    {event.category[0]?.name || "No Category"}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {event.visibility === "private"
                    ? "🔒"
                    : event.visibility === "unlisted"
                    ? "🔗"
                    : "🌐"}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {event.shortDescription}
                </p>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(event.startDate).toLocaleDateString()} at{" "}
                  {new Date(event.startDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                  {event.eventType === "virtual" ? (
                    <>
                      <Globe className="h-4 w-4 mr-2" /> Virtual Event
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.venue?.name}
                    </>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.timezone}
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Users className="h-4 w-4 mr-2" />
                  {event.currentAttendees}/{event.venue?.capacity} attendees
                  <span
                    className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      attendancePercentage >= 80
                        ? "bg-green-100 text-green-800"
                        : attendancePercentage >= 50
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {Math.round(attendancePercentage)}%
                  </span>
                </div>

                {event.customTags && event.customTags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    <Tag className="h-4 w-4 mr-2 text-gray-400" />
                    {event.customTags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex space-x-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4" />
                      {event.analytics?.totalRevenue?.toLocaleString() || 0}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-indigo-600">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600">
                      <Archive className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {events.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">No events found</div>
      )}

      {showCreateModal && (
        <EventCreationWizard onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default EventList;
