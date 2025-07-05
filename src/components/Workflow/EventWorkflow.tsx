import React, { useState } from "react";
import {
  FileText,
  Eye,
  Archive,
  Trash2,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  RotateCcw,
  Send,
  Copy,
} from "lucide-react";
import { Event } from "../../types";

interface EventWorkflowProps {
  events: Event[];
  onStatusChange: (eventId: string, status: Event["status"]) => void;
}

const EventWorkflow: React.FC<EventWorkflowProps> = ({
  events,
  onStatusChange,
}) => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const statusConfig = {
    draft: {
      label: "Draft",
      color: "bg-yellow-100 text-yellow-800",
      icon: FileText,
      description: "Event is being prepared",
    },
    published: {
      label: "Published",
      color: "bg-green-100 text-green-800",
      icon: Eye,
      description: "Event is live and accepting registrations",
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-red-100 text-red-800",
      icon: AlertCircle,
      description: "Event has been cancelled",
    },
    completed: {
      label: "Completed",
      color: "bg-blue-100 text-blue-800",
      icon: CheckCircle,
      description: "Event has finished successfully",
    },
    archived: {
      label: "Archived",
      color: "bg-gray-100 text-gray-800",
      icon: Archive,
      description: "Event is archived for record keeping",
    },
  };

  const workflowActions = {
    draft: [
      {
        action: "published",
        label: "Publish Event",
        icon: Send,
        color: "bg-green-600 hover:bg-green-700",
      },
      {
        action: "cancelled",
        label: "Cancel Event",
        icon: AlertCircle,
        color: "bg-red-600 hover:bg-red-700",
      },
    ],
    published: [
      {
        action: "draft",
        label: "Unpublish",
        icon: RotateCcw,
        color: "bg-yellow-600 hover:bg-yellow-700",
      },
      {
        action: "completed",
        label: "Mark Complete",
        icon: CheckCircle,
        color: "bg-blue-600 hover:bg-blue-700",
      },
      {
        action: "cancelled",
        label: "Cancel Event",
        icon: AlertCircle,
        color: "bg-red-600 hover:bg-red-700",
      },
    ],
    completed: [
      {
        action: "archived",
        label: "Archive Event",
        icon: Archive,
        color: "bg-gray-600 hover:bg-gray-700",
      },
      {
        action: "published",
        label: "Reopen Event",
        icon: RotateCcw,
        color: "bg-green-600 hover:bg-green-700",
      },
    ],
    cancelled: [
      {
        action: "draft",
        label: "Restore to Draft",
        icon: RotateCcw,
        color: "bg-yellow-600 hover:bg-yellow-700",
      },
      {
        action: "archived",
        label: "Archive Event",
        icon: Archive,
        color: "bg-gray-600 hover:bg-gray-700",
      },
    ],
    archived: [
      {
        action: "draft",
        label: "Restore Event",
        icon: RotateCcw,
        color: "bg-yellow-600 hover:bg-yellow-700",
      },
    ],
  };

  const handleEventSelect = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev?.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleBulkAction = (action: string) => {
    selectedEvents.forEach((eventId) => {
      onStatusChange(eventId, action as Event["status"]);
    });
    setSelectedEvents([]);
    setShowBulkActions(false);
  };

  const getEventsByStatus = (status: Event["status"]) => {
    return events?.filter((event) => event.status === status);
  };

  const getStatusStats = () => {
    return Object.keys(statusConfig)?.map((status) => ({
      status: status as Event["status"],
      count: getEventsByStatus(status as Event["status"])?.length,
      ...statusConfig[status as keyof typeof statusConfig],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Workflow</h1>
          <p className="text-gray-600 mt-1">
            Manage event lifecycle and status transitions
          </p>
        </div>

        {selectedEvents?.length > 0 && (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {selectedEvents.length} event
              {selectedEvents?.length > 1 ? "s" : ""} selected
            </span>
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Bulk Actions
            </button>
          </div>
        )}
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {getStatusStats()?.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.status}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.count}
                  </p>
                </div>
                <Icon className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bulk Actions Panel */}
      {showBulkActions && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Bulk Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleBulkAction("published")}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Send className="h-4 w-4" />
              <span>Publish Selected</span>
            </button>
            <button
              onClick={() => handleBulkAction("cancelled")}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <AlertCircle className="h-4 w-4" />
              <span>Cancel Selected</span>
            </button>
            <button
              onClick={() => handleBulkAction("archived")}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              <Archive className="h-4 w-4" />
              <span>Archive Selected</span>
            </button>
            <button
              onClick={() => {
                setSelectedEvents([]);
                setShowBulkActions(false);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Events by Status */}
      <div className="space-y-8">
        {Object.entries(statusConfig)?.map(([status, config]) => {
          const statusEvents = getEventsByStatus(status as Event["status"]);
          const Icon = config.icon;

          if (statusEvents?.length === 0) return null;

          return (
            <div
              key={status}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-900">
                      {config.label}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
                    >
                      {statusEvents?.length}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{config.description}</p>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {statusEvents?.map((event) => (
                  <div key={event.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedEvents.includes(event.id)}
                          onChange={() => handleEventSelect(event.id)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />

                        <div className="flex-shrink-0">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {event.title}
                          </h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {event.startDate.toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Users className="h-3 w-3 mr-1" />
                              {event.currentAttendees}/{event.maxAttendees}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.timezone}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {workflowActions[
                          status as keyof typeof workflowActions
                        ]?.map((action) => {
                          const ActionIcon = action.icon;
                          return (
                            <button
                              key={action.action}
                              onClick={() =>
                                onStatusChange(
                                  event.id,
                                  action.action as Event["status"]
                                )
                              }
                              className={`flex items-center space-x-1 px-3 py-1 text-white rounded-md transition-colors text-sm ${action.color}`}
                            >
                              <ActionIcon className="h-3 w-3" />
                              <span>{action.label}</span>
                            </button>
                          );
                        })}

                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {events?.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No events found
          </h3>
          <p className="text-gray-500">
            Create your first event to get started with workflow management
          </p>
        </div>
      )}
    </div>
  );
};

export default EventWorkflow;
