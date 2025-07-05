import React, { useState } from 'react';
import { 
  MapPin, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users, 
  Wifi, 
  Car, 
  Coffee,
  Phone,
  Mail,
  Globe,
  Star,
  Navigation
} from 'lucide-react';
import { Venue } from '../../types';

const VenueManager: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([
    {
      id: '1',
      name: 'San Francisco Convention Center',
      address: '747 Howard St',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
      zipCode: '94103',
      latitude: 37.7849,
      longitude: -122.4094,
      capacity: 5000,
      amenities: ['WiFi', 'Parking', 'Catering', 'AV Equipment', 'Air Conditioning'],
      images: ['https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800'],
      contactInfo: {
        phone: '+1 (415) 974-4000',
        email: 'info@sfconvention.com',
        website: 'https://sfconvention.com'
      },
      organizationId: 'org-1'
    },
    {
      id: '2',
      name: 'Tech Hub Coworking Space',
      address: '123 Innovation Drive',
      city: 'Palo Alto',
      state: 'CA',
      country: 'US',
      zipCode: '94301',
      latitude: 37.4419,
      longitude: -122.1430,
      capacity: 200,
      amenities: ['WiFi', 'Parking', 'Kitchen', 'Projector', 'Whiteboards'],
      images: ['https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'],
      contactInfo: {
        phone: '+1 (650) 555-0123',
        email: 'events@techhub.com'
      },
      organizationId: 'org-1'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const amenityIcons: { [key: string]: React.ComponentType<any> } = {
    'WiFi': Wifi,
    'Parking': Car,
    'Catering': Coffee,
    'Kitchen': Coffee,
    'AV Equipment': Users,
    'Projector': Users,
    'Air Conditioning': Users,
    'Whiteboards': Users
  };

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateVenue = (venueData: Partial<Venue>) => {
    const newVenue: Venue = {
      id: Date.now().toString(),
      organizationId: 'org-1',
      amenities: [],
      images: [],
      contactInfo: {},
      ...venueData
    } as Venue;

    setVenues([newVenue, ...venues]);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Venue Management</h1>
          <p className="text-gray-600 mt-1">Manage your event venues and locations</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Venue</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search venues by name, city, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVenues.map((venue) => (
          <div key={venue.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={venue.images[0] || 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt={venue.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 flex items-center space-x-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{venue.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {venue.address}, {venue.city}, {venue.state} {venue.zipCode}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Users className="h-4 w-4 mr-2" />
                Capacity: {venue.capacity.toLocaleString()} people
              </div>

              {/* Amenities */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {venue.amenities.slice(0, 4).map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || Users;
                    return (
                      <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md">
                        <Icon className="h-3 w-3 text-gray-600" />
                        <span className="text-xs text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                  {venue.amenities.length > 4 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{venue.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                {venue.contactInfo.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {venue.contactInfo.phone}
                  </div>
                )}
                {venue.contactInfo.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {venue.contactInfo.email}
                  </div>
                )}
                {venue.contactInfo.website && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="h-4 w-4 mr-2" />
                    <a href={venue.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedVenue(venue)}
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                  View Details
                </button>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                    <Navigation className="h-4 w-4" />
                  </button>
                  <button className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors text-sm">
                    Use for Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVenues.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No venues found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first venue'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Add Your First Venue
            </button>
          )}
        </div>
      )}

      {/* Create Venue Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Add New Venue</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="px-6 py-6 overflow-y-auto max-h-96">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter venue name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
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
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="ZIP or Postal Code"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Maximum number of people"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['WiFi', 'Parking', 'Catering', 'AV Equipment', 'Air Conditioning', 'Kitchen', 'Projector', 'Whiteboards'].map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Website URL"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle form submission
                    setShowCreateModal(false);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Add Venue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Venue Details Modal */}
      {selectedVenue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{selectedVenue.name}</h2>
                <button
                  onClick={() => setSelectedVenue(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="px-6 py-6 overflow-y-auto max-h-96">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedVenue.images[0] || 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={selectedVenue.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-600">
                      {selectedVenue.address}<br />
                      {selectedVenue.city}, {selectedVenue.state} {selectedVenue.zipCode}<br />
                      {selectedVenue.country}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Capacity</h3>
                    <p className="text-gray-600">{selectedVenue.capacity.toLocaleString()} people</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedVenue.amenities.map((amenity, index) => {
                        const Icon = amenityIcons[amenity] || Users;
                        return (
                          <div key={index} className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-md">
                            <Icon className="h-4 w-4 text-gray-600" />
                            <span className="text-sm text-gray-700">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      {selectedVenue.contactInfo.phone && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          {selectedVenue.contactInfo.phone}
                        </div>
                      )}
                      {selectedVenue.contactInfo.email && (
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          {selectedVenue.contactInfo.email}
                        </div>
                      )}
                      {selectedVenue.contactInfo.website && (
                        <div className="flex items-center text-gray-600">
                          <Globe className="h-4 w-4 mr-2" />
                          <a href={selectedVenue.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setSelectedVenue(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  Use for Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueManager;