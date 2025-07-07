import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Archive,
  Copy,
  Share2,
  Globe,
  Clock,
  Tag,
} from "lucide-react";
import { Event } from "../../types";
import EventCreationWizard from "./EventCreationWizard";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { getAllEvents } from "../../features/eventSlice";

// const EventList: React.FC = () => {
//   const [events, setEvents] = useState<Event[]>([
//     {
//       id: "1",
//       organizationId: "org-1",
//       title: "Tech Conference 2024",
//       description:
//         "Annual technology conference featuring the latest innovations in AI, blockchain, and cloud computing. Join industry leaders and innovators for two days of networking, learning, and inspiration.",
//       shortDescription:
//         "Annual technology conference featuring the latest innovations",
//       startDate: new Date("2024-03-15T09:00:00"),
//       endDate: new Date("2024-03-15T17:00:00"),
//       timezone: "America/New_York",
//       eventType: "in-person",
//       venue: {
//         id: "venue-1",
//         name: "San Francisco Convention Center",
//         address: "747 Howard St",
//         city: "San Francisco",
//         state: "CA",
//         country: "US",
//         zipCode: "94103",
//         latitude: 37.7849,
//         longitude: -122.4094,
//         capacity: 500,
//         amenities: ["WiFi", "Parking", "Catering"],
//         images: [],
//         contactInfo: {},
//         organizationId: "org-1",
//       },
//       imageUrl:
//         "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800",
//       galleryImages: [],
//       category: {
//         id: "1",
//         name: "Technology",
//         description: "Tech conferences and meetups",
//         color: "#3B82F6",
//         icon: "Laptop",
//         isDefault: true,
//       },
//       customTags: ["AI", "Blockchain", "Networking"],
//       status: "published",
//       visibility: "public",
//       maxAttendees: 500,
//       currentAttendees: 350,
//       tickets: [],
//       createdAt: new Date("2024-01-15"),
//       updatedAt: new Date("2024-02-01"),
//       publishedAt: new Date("2024-02-01"),
//       analytics: {
//         totalViews: 1250,
//         uniqueViews: 980,
//         totalTicketsSold: 350,
//         totalRevenue: 35000,
//         conversionRate: 28,
//         topTrafficSources: ["Direct", "Social Media", "Email"],
//         geographicData: [],
//         dailyStats: [],
//         deviceStats: { desktop: 60, mobile: 35, tablet: 5 },
//       },
//       settings: {
//         allowWaitlist: true,
//         requireApproval: false,
//         collectAttendeeInfo: true,
//         enableQRCode: true,
//         enableSocialSharing: true,
//         enableComments: false,
//       },
//       seo: {
//         metaTitle: "Tech Conference 2024 - Innovation & Networking",
//         metaDescription:
//           "Join the premier technology conference featuring AI, blockchain, and cloud computing innovations.",
//         keywords: [
//           "technology",
//           "conference",
//           "AI",
//           "blockchain",
//           "networking",
//         ],
//       },
//     },
//     {
//       id: "2",
//       organizationId: "org-1",
//       title: "Digital Marketing Summit",
//       description:
//         "Learn the latest digital marketing strategies from industry experts. Covering SEO, social media, content marketing, and paid advertising.",
//       shortDescription: "Learn the latest digital marketing strategies",
//       startDate: new Date("2024-03-20T10:00:00"),
//       endDate: new Date("2024-03-20T16:00:00"),
//       timezone: "America/New_York",
//       eventType: "hybrid",
//       venue: {
//         id: "venue-2",
//         name: "New York Marriott",
//         address: "1535 Broadway",
//         city: "New York",
//         state: "NY",
//         country: "US",
//         zipCode: "10036",
//         latitude: 40.7589,
//         longitude: -73.9851,
//         capacity: 300,
//         amenities: ["WiFi", "AV Equipment", "Catering"],
//         images: [],
//         contactInfo: {},
//         organizationId: "org-1",
//       },
//       virtualEventUrl: "https://zoom.us/j/123456789",
//       imageUrl:
//         "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
//       galleryImages: [],
//       category: {
//         id: "2",
//         name: "Marketing",
//         description: "Marketing and business events",
//         color: "#10B981",
//         icon: "TrendingUp",
//         isDefault: true,
//       },
//       customTags: ["Digital Marketing", "SEO", "Social Media"],
//       status: "published",
//       visibility: "public",
//       maxAttendees: 300,
//       currentAttendees: 180,
//       tickets: [],
//       createdAt: new Date("2024-01-20"),
//       updatedAt: new Date("2024-02-05"),
//       publishedAt: new Date("2024-02-05"),
//       analytics: {
//         totalViews: 890,
//         uniqueViews: 720,
//         totalTicketsSold: 180,
//         totalRevenue: 18000,
//         conversionRate: 20,
//         topTrafficSources: ["Google", "LinkedIn", "Direct"],
//         geographicData: [],
//         dailyStats: [],
//         deviceStats: { desktop: 55, mobile: 40, tablet: 5 },
//       },
//       settings: {
//         allowWaitlist: true,
//         requireApproval: false,
//         collectAttendeeInfo: true,
//         enableQRCode: true,
//         enableSocialSharing: true,
//         enableComments: true,
//       },
//       seo: {
//         metaTitle: "Digital Marketing Summit 2024",
//         metaDescription:
//           "Master digital marketing with expert-led sessions on SEO, social media, and content strategy.",
//         keywords: [
//           "digital marketing",
//           "SEO",
//           "social media",
//           "content marketing",
//         ],
//       },
//     },
//   ]);
//   const dispatch = useAppDispatch();
//   // const { events, loading, error } = useAppSelector((state) => state.events);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     dispatch(
//       getAllEvents({
//         status: statusFilter,
//         type: typeFilter,
//         search: searchTerm,
//       })
//     );
//   }, [dispatch, statusFilter, typeFilter, searchTerm]);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "published":
//         return "bg-green-100 text-green-800";
//       case "draft":
//         return "bg-yellow-100 text-yellow-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       case "completed":
//         return "bg-gray-100 text-gray-800";
//       case "archived":
//         return "bg-purple-100 text-purple-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getTypeIcon = (type: string) => {
//     switch (type) {
//       case "virtual":
//         return Globe;
//       case "hybrid":
//         return Users;
//       default:
//         return MapPin;
//     }
//   };

//   const filteredEvents = events.filter((event) => {
//     const matchesSearch =
//       event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       event.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || event.status === statusFilter;
//     const matchesType = typeFilter === "all" || event.eventType === typeFilter;

//     return matchesSearch && matchesStatus && matchesType;
//   });

//   const handleCreateEvent = (eventData: Partial<Event>) => {
//     // const newEvent: Event = {
//     //   id: Date.now().toString(),
//     //   organizationId: "org-1",
//     //   createdAt: new Date(),
//     //   updatedAt: new Date(),
//     //   currentAttendees: 0,
//     //   tickets: [],
//     //   analytics: {
//     //     totalViews: 0,
//     //     uniqueViews: 0,
//     //     totalTicketsSold: 0,
//     //     totalRevenue: 0,
//     //     conversionRate: 0,
//     //     topTrafficSources: [],
//     //     geographicData: [],
//     //     dailyStats: [],
//     //     deviceStats: { desktop: 0, mobile: 0, tablet: 0 },
//     //   },
//     //   galleryImages: [],
//     //   customTags: [],
//     //   ...eventData,
//     // } as Event;

//     // if (eventData.status === "published") {
//     //   newEvent.publishedAt = new Date();
//     // }

//     // setEvents([newEvent, ...events]);
//     setShowCreateModal(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Events</h1>
//           <p className="text-gray-600 mt-1">Manage your event portfolio</p>
//         </div>
//         <button
//           onClick={() => setShowCreateModal(true)}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center space-x-2"
//         >
//           <Plus className="h-4 w-4" />
//           <span>Create Event</span>
//         </button>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search events..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           <div className="flex items-center space-x-3">
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="all">All Status</option>
//               <option value="draft">Draft</option>
//               <option value="published">Published</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="archived">Archived</option>
//             </select>

//             <select
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="all">All Types</option>
//               <option value="in-person">In-Person</option>
//               <option value="virtual">Virtual</option>
//               <option value="hybrid">Hybrid</option>
//             </select>

//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//             >
//               <Filter className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {showFilters && (
//           <div className="mt-4 pt-4 border-t border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Date Range
//                 </label>
//                 <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
//                   <option>All Time</option>
//                   <option>This Week</option>
//                   <option>This Month</option>
//                   <option>Next 30 Days</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category
//                 </label>
//                 <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
//                   <option>All Categories</option>
//                   <option>Technology</option>
//                   <option>Business</option>
//                   <option>Marketing</option>
//                   <option>Education</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Attendance
//                 </label>
//                 <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
//                   <option>All Events</option>
//                   <option>High Attendance (80%+)</option>
//                   <option>Medium Attendance (50-80%)</option>
//                   <option>Low Attendance (&lt;50%)</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Events Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {events.map((event) => {
//           const TypeIcon = getTypeIcon(event.eventType);
//           const attendancePercentage =
//             (event.currentAttendees / event.maxAttendees) * 100;

//           return (
//             <div
//               key={event.id}
//               className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
//             >
//               <div className="relative">
//                 <img
//                   src={event.imageUrl}
//                   alt={event.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute top-3 left-3 flex items-center space-x-2">
//                   <span
//                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                       event.status
//                     )}`}
//                   >
//                     {event.status}
//                   </span>
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800">
//                     <TypeIcon className="h-3 w-3 mr-1" />
//                     {event.eventType}
//                   </span>
//                 </div>

//                 <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <div className="relative">
//                     <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
//                       <MoreVertical className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-2">
//                     <div
//                       className="w-3 h-3 rounded-full"
//                       style={{ backgroundColor: event.category.color }}
//                     />
//                     <span className="text-sm text-gray-600">
//                       {event.category.name}
//                     </span>
//                   </div>
//                   <span className="text-sm text-gray-500">
//                     {event.visibility === "private"
//                       ? "🔒"
//                       : event.visibility === "unlisted"
//                       ? "🔗"
//                       : "🌐"}
//                   </span>
//                 </div>

//                 <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
//                   {event.title}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-4 line-clamp-2">
//                   {event.shortDescription}
//                 </p>

//                 <div className="space-y-2 mb-4">
//                   <div className="flex items-center text-sm text-gray-500">
//                     <Calendar className="h-4 w-4 mr-2" />
//                     {event.startDate.toLocaleDateString()} at{" "}
//                     {event.startDate.toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </div>

//                   <div className="flex items-center text-sm text-gray-500">
//                     {event.eventType === "virtual" ? (
//                       <>
//                         <Globe className="h-4 w-4 mr-2" />
//                         Virtual Event
//                       </>
//                     ) : (
//                       <>
//                         <MapPin className="h-4 w-4 mr-2" />
//                         {event.venue?.name || "TBD"}
//                       </>
//                     )}
//                   </div>

//                   <div className="flex items-center text-sm text-gray-500">
//                     <Clock className="h-4 w-4 mr-2" />
//                     {event.timezone}
//                   </div>

//                   <div className="flex items-center text-sm text-gray-500">
//                     <Users className="h-4 w-4 mr-2" />
//                     {event.currentAttendees}/{event.maxAttendees} attendees
//                     <span
//                       className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
//                         attendancePercentage >= 80
//                           ? "bg-green-100 text-green-800"
//                           : attendancePercentage >= 50
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {Math.round(attendancePercentage)}%
//                     </span>
//                   </div>
//                 </div>

//                 {event.customTags.length > 0 && (
//                   <div className="flex items-center mb-4">
//                     <Tag className="h-4 w-4 mr-2 text-gray-400" />
//                     <div className="flex flex-wrap gap-1">
//                       {event.customTags.slice(0, 3).map((tag, index) => (
//                         <span
//                           key={index}
//                           className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                       {event.customTags.length > 3 && (
//                         <span className="text-xs text-gray-500">
//                           +{event.customTags.length - 3} more
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center text-sm text-gray-500">
//                       <Eye className="h-4 w-4 mr-1" />
//                       {event.analytics.totalViews}
//                     </div>
//                     <div className="flex items-center text-sm text-gray-500">
//                       <DollarSign className="h-4 w-4 mr-1" />$
//                       {event.analytics.totalRevenue.toLocaleString()}
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
//                       <Share2 className="h-4 w-4" />
//                     </button>
//                     <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
//                       <Copy className="h-4 w-4" />
//                     </button>
//                     <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
//                       <Edit className="h-4 w-4" />
//                     </button>
//                     <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
//                       <Archive className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {filteredEvents.length === 0 && (
//         <div className="text-center py-12">
//           <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             No events found
//           </h3>
//           <p className="text-gray-500 mb-4">
//             {searchTerm || statusFilter !== "all" || typeFilter !== "all"
//               ? "Try adjusting your search or filters"
//               : "Get started by creating your first event"}
//           </p>
//           {!searchTerm && statusFilter === "all" && typeFilter === "all" && (
//             <button
//               onClick={() => setShowCreateModal(true)}
//               className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
//             >
//               Create Your First Event
//             </button>
//           )}
//         </div>
//       )}

//       {showCreateModal && (
//         <EventCreationWizard onClose={() => setShowCreateModal(false)} />
//       )}
//     </div>
//   );
// };

// export default EventList;

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

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: event.category.color }}
                  />
                  <span className="text-sm text-gray-600">
                    {event.category.name}
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
                      {event.venue?.name || "TBD"}
                    </>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.timezone}
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Users className="h-4 w-4 mr-2" />
                  {event.currentAttendees}/{event.maxAttendees} attendees
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
                      <Eye className="h-4 w-4 mr-1" />{" "}
                      {event.analytics?.totalViews || 0}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" /> $
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
