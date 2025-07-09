import React, { useState } from "react";
import {
  MapPin,
  Globe,
  Users,
  Image,
  Save,
  Eye,
  ArrowLeft,
  ArrowRight,
  Clock,
  Camera,
  Link,
  CheckCircle,
} from "lucide-react";
import { Event, EventCategory } from "../../types";
import { useAppDispatch } from "../../hooks/hook";
import { createEvent } from "../../features/eventSlice";

interface EventCreationWizardProps {
  onClose: () => void;
}

const EventCreationWizard: React.FC<EventCreationWizardProps> = ({
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [eventData, setEventData] = useState<Partial<Event>>({
    title: "",
    description: "",
    shortDescription: "",
    eventType: "in-person",
    status: "draft",
    visibility: "public",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    venue: {
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      capacity: 0,
    },
    settings: {
      allowWaitlist: true,
      requireApproval: false,
      collectAttendeeInfo: true,
      enableQRCode: true,
      enableSocialSharing: true,
      enableComments: false,
    },
    seo: {
      keywords: [],
    },
    customTags: [],
  });

  const defaultCategories: EventCategory[] = [
    {
      id: "1",
      name: "Technology",
      description: "Tech conferences and meetups",
      color: "#3B82F6",
      icon: "Laptop",
      isDefault: true,
    },
    {
      id: "2",
      name: "Business",
      description: "Business and networking events",
      color: "#10B981",
      icon: "Briefcase",
      isDefault: true,
    },
    {
      id: "3",
      name: "Arts & Culture",
      description: "Cultural and artistic events",
      color: "#F59E0B",
      icon: "Palette",
      isDefault: true,
    },
    {
      id: "4",
      name: "Sports",
      description: "Sports and fitness events",
      color: "#EF4444",
      icon: "Trophy",
      isDefault: true,
    },
    {
      id: "5",
      name: "Education",
      description: "Educational workshops and seminars",
      color: "#8B5CF6",
      icon: "BookOpen",
      isDefault: true,
    },
    {
      id: "6",
      name: "Entertainment",
      description: "Entertainment and social events",
      color: "#EC4899",
      icon: "Music",
      isDefault: true,
    },
  ];

  const timezones = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Asia/Kolkata",
    "Australia/Sydney",
  ];

  const steps = [
    {
      id: 1,
      title: "Basic Info",
      description: "Event details and description",
    },
    { id: 2, title: "Date & Time", description: "Schedule and timezone" },
    { id: 3, title: "Location", description: "Venue or virtual details" },
    { id: 4, title: "Category & Tags", description: "Classification and SEO" },
    { id: 5, title: "Media & Images", description: "Visual content" },
    { id: 6, title: "Settings", description: "Event configuration" },
    { id: 7, title: "Review", description: "Final review and publish" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const [galleryError, setGalleryError] = useState<string>("");

  const handleSave = async (status: "draft" | "published") => {
    setGalleryError("");
    try {
      setIsSubmitting(true);
      await dispatch(
        createEvent({
          ...eventData,
          startDate: eventData.startDate?.toISOString(),
          endDate: eventData.endDate?.toISOString(),
          category: eventData.category ? [eventData.category] : [],
          galleryImages: eventData.galleryImages,
          status,
        })
      ).unwrap();
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                value={eventData.title || ""}
                onChange={(e) =>
                  setEventData({ ...eventData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your event title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <input
                type="text"
                value={eventData.shortDescription || ""}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    shortDescription: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Brief description for listings (max 160 characters)"
                maxLength={160}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description *
              </label>
              <textarea
                value={eventData.description || ""}
                onChange={(e) =>
                  setEventData({ ...eventData, description: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Detailed event description, agenda, speakers, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type *
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "in-person", label: "In-Person", icon: MapPin },
                  { value: "virtual", label: "Virtual", icon: Globe },
                  { value: "hybrid", label: "Hybrid", icon: Users },
                ].map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        setEventData({
                          ...eventData,
                          eventType: type.value as any,
                        })
                      }
                      className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                        eventData.eventType === type.value
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone *
              </label>
              <select
                value={eventData.timezone || ""}
                onChange={(e) =>
                  setEventData({ ...eventData, timezone: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={
                    eventData.startDate
                      ? new Date(eventData.startDate).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      startDate: new Date(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={
                    eventData.endDate
                      ? new Date(eventData.endDate).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      endDate: new Date(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Timezone Preview
                </span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Selected timezone: {eventData.timezone}
              </p>
              {eventData.startDate && (
                <p className="text-sm text-blue-700">
                  Event starts:{" "}
                  {new Date(eventData.startDate).toLocaleString("en-US", {
                    timeZone: eventData.timezone,
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {eventData.eventType === "virtual" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Virtual Event URL *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={eventData.virtualEventUrl || ""}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        virtualEventUrl: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="https://zoom.us/j/123456789"
                  />
                  <Link className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Zoom, Google Meet, Teams, or any other virtual platform URL
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue Name *
                  </label>
                  <input
                    type="text"
                    value={eventData.venue?.name || ""}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        venue: {
                          ...eventData.venue,
                          name: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Convention Center, Hotel, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={eventData.venue?.address || ""}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        venue: {
                          ...eventData.venue,
                          address: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={eventData.venue?.city || ""}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          venue: {
                            ...eventData.venue,
                            city: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={eventData.venue?.state || ""}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          venue: {
                            ...eventData.venue,
                            state: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="State or Province"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      value={eventData.venue?.country || ""}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          venue: {
                            ...eventData.venue,
                            country: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="IN">India</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      value={eventData.venue?.zipCode || ""}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          venue: {
                            ...eventData.venue,
                            zipCode: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="ZIP or Postal Code"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue Capacity
                  </label>
                  <input
                    type="number"
                    value={eventData.venue?.capacity || ""}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        venue: {
                          ...eventData.venue,
                          capacity: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Maximum number of attendees"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Category *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {defaultCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setEventData({ ...eventData, category })}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      eventData.category?.id === category.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {category.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Tags
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter tags separated by commas (e.g., networking, startup, innovation)"
                onChange={(e) => {
                  const tags = e.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag);
                  setEventData({ ...eventData, customTags: tags });
                }}
              />
              <p className="text-sm text-gray-500 mt-1">
                Tags help attendees discover your event
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={eventData.seo?.metaTitle || ""}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    seo: { ...eventData.seo, metaTitle: e.target.value },
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="SEO-optimized title for search engines"
                maxLength={60}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Meta Description
              </label>
              <textarea
                value={eventData.seo?.metaDescription || ""}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    seo: { ...eventData.seo, metaDescription: e.target.value },
                  })
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Brief description for search engine results"
                maxLength={160}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="event-gallery-upload"
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      try {
                        setGalleryError("");
                        const uploadPromises = Array.from(files).map((file) =>
                          uploadImage(file)
                        );
                        const uploadedUrls = await Promise.all(uploadPromises);
                        setEventData((prev) => ({
                          ...prev,
                          galleryImages: uploadedUrls,
                        }));
                      } catch {
                        setGalleryError(
                          "Gallery image upload failed. Please try again."
                        );
                      }
                    }
                  }}
                />
                <label htmlFor="event-gallery-upload">
                  <span className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer inline-block">
                    Choose File(s)
                  </span>
                </label>
                {/* Gallery Previews */}
                {eventData.galleryImages &&
                  eventData.galleryImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                      {eventData.galleryImages.map((img, idx) => (
                        <img
                          key={img + idx}
                          src={img}
                          alt={`Gallery Preview ${idx + 1}`}
                          className="rounded-lg max-h-24 object-contain border"
                        />
                      ))}
                    </div>
                  )}
                {galleryError && (
                  <div className="text-red-600 text-sm mt-2">
                    {galleryError}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Cover Image (optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <p className="text-sm text-gray-600 mb-2">
                  Provide an image URL for your event cover image
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Recommended: 1920x1080px, JPG or PNG, max 5MB
                </p>
                <input
                  type="url"
                  placeholder="Paste image URL here (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                  value={eventData.imageUrl || ""}
                  onChange={(e) =>
                    setEventData({ ...eventData, imageUrl: e.target.value })
                  }
                />
                {eventData.imageUrl && (
                  <img
                    src={eventData.imageUrl}
                    alt="Event Cover Preview"
                    className="mx-auto mt-4 rounded-lg max-h-48 object-contain border"
                  />
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">
                Image Guidelines
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Use high-quality, professional images</li>
                <li>• Ensure images are relevant to your event</li>
                <li>• Avoid copyrighted material</li>
                <li>• Consider accessibility with alt text</li>
              </ul>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Visibility
              </label>
              <div className="space-y-3">
                {[
                  {
                    value: "public",
                    label: "Public",
                    description: "Anyone can find and view this event",
                  },
                  {
                    value: "unlisted",
                    label: "Unlisted",
                    description: "Only people with the link can view",
                  },
                  {
                    value: "private",
                    label: "Private",
                    description: "Invitation only",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value={option.value}
                      checked={eventData.visibility === option.value}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          visibility: e.target.value as any,
                        })
                      }
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Event Features
              </label>
              <div className="space-y-4">
                {[
                  {
                    key: "allowWaitlist",
                    label: "Enable Waitlist",
                    description: "Allow people to join waitlist when sold out",
                  },
                  {
                    key: "requireApproval",
                    label: "Require Approval",
                    description: "Manually approve each registration",
                  },
                  {
                    key: "collectAttendeeInfo",
                    label: "Collect Attendee Info",
                    description: "Gather additional information from attendees",
                  },
                  {
                    key: "enableQRCode",
                    label: "QR Code Check-in",
                    description: "Generate QR codes for easy check-in",
                  },
                  {
                    key: "enableSocialSharing",
                    label: "Social Sharing",
                    description: "Allow attendees to share on social media",
                  },
                  {
                    key: "enableComments",
                    label: "Event Comments",
                    description: "Let attendees leave comments and questions",
                  },
                ].map((setting) => (
                  <label
                    key={setting.key}
                    className="flex items-start space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={
                        eventData.settings?.[
                          setting.key as keyof typeof eventData.settings
                        ] || false
                      }
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          settings: {
                            ...eventData.settings!,
                            [setting.key]: e.target.checked,
                          },
                        })
                      }
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {setting.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {setting.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-medium text-green-800">
                  Event Ready for Review
                </h3>
              </div>
              <p className="text-green-700">
                Your event has been configured successfully. Review the details
                below and choose to save as draft or publish immediately.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-4">Event Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Title:</span>
                  <span className="font-medium">{eventData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">
                    {eventData.eventType}
                  </span>
                </div>

                {(eventData.eventType === "in-person" ||
                  eventData.eventType === "hybrid") &&
                  eventData.venue && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Venue:</span>
                        <span className="font-medium">
                          {eventData.venue.name || "Not specified"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium text-right">
                          {[
                            eventData.venue.address,
                            eventData.venue.city,
                            eventData.venue.state,
                            eventData.venue.country,
                            eventData.venue.zipCode,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </div>
                      {eventData.venue.capacity && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">
                            {eventData.venue.capacity > 0
                              ? eventData.venue.capacity
                              : "Not specified"}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                {(eventData.eventType === "virtual" ||
                  eventData.eventType === "hybrid") &&
                  eventData.virtualEventUrl && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Virtual URL:</span>
                      <span className="font-medium break-all text-right">
                        {eventData.virtualEventUrl}
                      </span>
                    </div>
                  )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">
                    {eventData.category?.name || "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visibility:</span>
                  <span className="font-medium capitalize">
                    {eventData.visibility}
                  </span>
                </div>
                {eventData.startDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">
                      {new Date(eventData.startDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: eventData.timezone,
                      })}{" "}
                      ({eventData.timezone})
                    </span>
                  </div>
                )}
                {eventData.endDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-medium">
                      {new Date(eventData.endDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: eventData.timezone,
                      })}
                    </span>
                  </div>
                )}
                {eventData.customTags && eventData.customTags.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tags:</span>
                    <span className="font-medium">
                      {eventData.customTags.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Next Steps</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Set up ticket types and pricing</li>
                <li>• Configure payment processing</li>
                <li>• Customize event page design</li>
                <li>• Set up email notifications</li>
                <li>• Plan marketing and promotion</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Create New Event</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentStep >= step.id
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.id}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {step.description}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-4 ${
                      currentStep > step.id ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-96">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-3">
              {currentStep === steps.length ? (
                <>
                  <button
                    onClick={() => handleSave("draft")}
                    disabled={isSubmitting}
                    className={`flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Save className="h-4 w-4" />
                    <span>Save as Draft</span>
                  </button>
                  <button
                    onClick={() => handleSave("published")}
                    disabled={isSubmitting}
                    className={`flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Eye className="h-4 w-4" />
                    <span>Publish Event</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Image upload failed");
  const data = await response.json();
  return data.url;
}

export default EventCreationWizard;
