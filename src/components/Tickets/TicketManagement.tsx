import React, { useState, useEffect } from "react";
import {
  Ticket,
  Plus,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Users,
  Settings,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { getAllEvents } from "../../features/eventSlice";
import { createTicket, getAllTickets } from "../../features/ticketSlice";

const TicketManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    events,
    loading: eventsLoading,
    error: eventsError,
  } = useSelector((state: RootState) => state.events);
  const {
    tickets,
    loading: ticketsLoading,
    error: ticketsError,
    createLoading,
    createError,
  } = useSelector((state: RootState) => state.tickets);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    type: "paid",
    salesStart: "",
    salesEnd: "",
  });

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getAllTickets());
  }, [dispatch]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEvent) {
      alert("Please select an event.");
      return;
    }

    try {
      await dispatch(
        createTicket({
          eventId: selectedEvent,
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
          type: formData.type as "paid" | "free" | "VIP",
          salesStart: formData.salesStart,
          salesEnd: formData.salesEnd,
        })
      ).unwrap();

      setShowCreateModal(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        type: "paid",
        salesStart: "",
        salesEnd: "",
      });
      setSelectedEvent("");

      // Refresh tickets after creating a new one
      dispatch(getAllTickets());
    } catch (error) {
      console.error("Ticket creation error:", error);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "free":
        return "bg-green-100 text-green-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "vip":
      case "VIP":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate stats from tickets data
  const totalTickets = tickets.reduce(
    (sum, ticket) => sum + ticket.quantity,
    0
  );
  const totalSold = tickets.reduce((sum, ticket) => sum + ticket.sold, 0);
  const totalRevenue = tickets.reduce(
    (sum, ticket) => sum + ticket.price * ticket.sold,
    0
  );
  const conversionRate =
    totalTickets > 0 ? ((totalSold / totalTickets) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Ticket Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Ticket Type</span>
        </button>
      </div>

      {/* Ticket Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{totalTickets}</p>
            </div>
            <Ticket className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sold</p>
              <p className="text-2xl font-bold text-gray-900">{totalSold}</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion</p>
              <p className="text-2xl font-bold text-gray-900">
                {conversionRate}%
              </p>
            </div>
            <Calendar className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Ticket Types</h3>
        </div>

        {ticketsLoading ? (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500">Loading tickets...</p>
          </div>
        ) : ticketsError ? (
          <div className="px-6 py-8 text-center">
            <p className="text-red-500">
              Error loading tickets: {ticketsError}
            </p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500">
              No tickets found. Create your first ticket type!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {ticket.eventId.title}
                            <span
                              className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                                ticket.type
                              )}`}
                            >
                              {ticket.type}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {ticket.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${ticket.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {ticket.quantity - ticket.sold}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ticket.sold}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{
                            width: `${(ticket.sold / ticket.quantity) * 100}%`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        {new Date(ticket.salesStart).toLocaleDateString()}
                      </div>
                      <div>
                        to {new Date(ticket.salesEnd).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Ticket Type</h2>
            <form className="space-y-4" onSubmit={handleCreateTicket}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                >
                  <option value="" disabled>
                    {eventsLoading ? "Loading events..." : "Select Event"}
                  </option>
                  {events &&
                    events.map((event) => (
                      <option key={event._id} value={event._id}>
                        {event.title}
                      </option>
                    ))}
                </select>
                {eventsError && (
                  <p className="text-red-500 text-sm mt-1">
                    Error: {eventsError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ticket Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ticket name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Brief description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="100"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ticket Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sales Start
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.salesStart}
                    onChange={(e) =>
                      setFormData({ ...formData, salesStart: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sales End
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.salesEnd}
                    onChange={(e) =>
                      setFormData({ ...formData, salesEnd: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {createLoading && (
                <p className="text-blue-600 text-sm">Creating ticket...</p>
              )}
              {createError && (
                <p className="text-red-600 text-sm">{createError}</p>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {createLoading ? "Creating..." : "Create Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManagement;
