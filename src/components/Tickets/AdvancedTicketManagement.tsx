import React, { useState } from 'react';
import { 
  Ticket, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  DollarSign, 
  Users, 
  Settings,
  Clock,
  Tag,
  Gift,
  UserPlus,
  AlertCircle,
  TrendingUp,
  Copy,
  Eye,
  CheckCircle,
  X,
  Percent,
  Star,
  Crown,
  Zap
} from 'lucide-react';
import { Ticket as TicketType, PromotionalCode, GroupBooking, WaitlistEntry } from '../../types';

const AdvancedTicketManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);

  const [tickets] = useState<TicketType[]>([
    {
      id: '1',
      eventId: '1',
      name: 'Early Bird Special',
      description: 'Limited time offer for early registrations',
      basePrice: 99,
      pricingTiers: [
        { id: '1', name: 'Super Early Bird', price: 79, startDate: new Date('2024-01-15'), endDate: new Date('2024-02-15'), isActive: true },
        { id: '2', name: 'Early Bird', price: 89, startDate: new Date('2024-02-16'), endDate: new Date('2024-03-01'), isActive: true },
        { id: '3', name: 'Regular', price: 99, startDate: new Date('2024-03-02'), endDate: new Date('2024-03-10'), isActive: true }
      ],
      quantity: 200,
      sold: 85,
      reserved: 15,
      type: 'early-bird',
      salesStart: new Date('2024-01-15'),
      salesEnd: new Date('2024-03-10'),
      isActive: true,
      settings: {
        minQuantity: 1,
        maxQuantity: 5,
        transferable: true,
        refundable: true,
        requiresApproval: false,
        allowGroupBooking: true,
        groupDiscountPercentage: 15,
        groupMinQuantity: 10
      },
      benefits: ['Early access to venue', 'Welcome drink', 'Networking session', 'Digital certificate'],
      restrictions: ['Non-transferable after event date', 'ID required at entry'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      eventId: '1',
      name: 'VIP Premium Experience',
      description: 'Exclusive access with premium amenities',
      basePrice: 299,
      pricingTiers: [
        { id: '4', name: 'VIP Early', price: 249, startDate: new Date('2024-01-15'), endDate: new Date('2024-02-28'), isActive: true },
        { id: '5', name: 'VIP Regular', price: 299, startDate: new Date('2024-03-01'), endDate: new Date('2024-03-10'), isActive: true }
      ],
      quantity: 50,
      sold: 23,
      reserved: 5,
      type: 'vip',
      salesStart: new Date('2024-01-15'),
      salesEnd: new Date('2024-03-10'),
      isActive: true,
      settings: {
        minQuantity: 1,
        maxQuantity: 2,
        transferable: false,
        refundable: true,
        requiresApproval: true,
        allowGroupBooking: false
      },
      benefits: ['VIP lounge access', 'Premium seating', 'Meet & greet with speakers', 'Exclusive swag bag', 'Valet parking', 'Gourmet catering'],
      restrictions: ['Photo ID required', 'Dress code applies', 'Non-transferable'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '3',
      eventId: '1',
      name: 'Student Discount',
      description: 'Special pricing for students with valid ID',
      basePrice: 49,
      pricingTiers: [
        { id: '6', name: 'Student Rate', price: 49, startDate: new Date('2024-01-15'), endDate: new Date('2024-03-10'), isActive: true }
      ],
      quantity: 100,
      sold: 34,
      reserved: 8,
      type: 'paid',
      salesStart: new Date('2024-01-15'),
      salesEnd: new Date('2024-03-10'),
      isActive: true,
      settings: {
        minQuantity: 1,
        maxQuantity: 1,
        transferable: false,
        refundable: false,
        requiresApproval: true,
        allowGroupBooking: true,
        groupDiscountPercentage: 10,
        groupMinQuantity: 5
      },
      benefits: ['Full event access', 'Student networking session', 'Career guidance booth'],
      restrictions: ['Valid student ID required', 'Verification at entry', 'Non-refundable'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-20')
    }
  ]);

  const [promotionalCodes] = useState<PromotionalCode[]>([
    {
      id: '1',
      code: 'LAUNCH2024',
      type: 'percentage',
      value: 20,
      description: '20% off for launch event',
      usageLimit: 100,
      usedCount: 45,
      validFrom: new Date('2024-01-15'),
      validUntil: new Date('2024-02-15'),
      applicableTicketTypes: ['1', '2'],
      isActive: true,
      createdAt: new Date('2024-01-10')
    },
    {
      id: '2',
      code: 'EARLYBIRD50',
      type: 'fixed_amount',
      value: 50,
      description: '$50 off early bird tickets',
      usageLimit: 50,
      usedCount: 23,
      validFrom: new Date('2024-01-15'),
      validUntil: new Date('2024-02-28'),
      applicableTicketTypes: ['1'],
      isActive: true,
      createdAt: new Date('2024-01-12')
    },
    {
      id: '3',
      code: 'BUY2GET1',
      type: 'buy_x_get_y',
      value: 0,
      description: 'Buy 2 tickets, get 1 free',
      usageLimit: 25,
      usedCount: 8,
      validFrom: new Date('2024-02-01'),
      validUntil: new Date('2024-03-01'),
      applicableTicketTypes: ['1'],
      isActive: true,
      createdAt: new Date('2024-01-25'),
      buyXGetY: {
        buyQuantity: 2,
        getQuantity: 1
      }
    }
  ]);

  const [groupBookings] = useState<GroupBooking[]>([
    {
      id: '1',
      eventId: '1',
      ticketTypeId: '1',
      groupName: 'TechCorp Team',
      contactEmail: 'events@techcorp.com',
      contactPhone: '+1-555-0123',
      requestedQuantity: 25,
      discountPercentage: 15,
      specialRequests: 'Seating together, dietary restrictions for 3 members',
      status: 'pending',
      createdAt: new Date('2024-01-20')
    },
    {
      id: '2',
      eventId: '1',
      ticketTypeId: '1',
      groupName: 'University Students',
      contactEmail: 'student.council@university.edu',
      contactPhone: '+1-555-0456',
      requestedQuantity: 15,
      discountPercentage: 20,
      status: 'approved',
      createdAt: new Date('2024-01-18'),
      approvedAt: new Date('2024-01-19')
    }
  ]);

  const [waitlist] = useState<WaitlistEntry[]>([
    {
      id: '1',
      eventId: '1',
      ticketTypeId: '2',
      email: 'john.doe@email.com',
      name: 'John Doe',
      phone: '+1-555-0789',
      requestedQuantity: 1,
      position: 1,
      notified: false,
      createdAt: new Date('2024-01-22')
    },
    {
      id: '2',
      eventId: '1',
      ticketTypeId: '2',
      email: 'jane.smith@email.com',
      name: 'Jane Smith',
      requestedQuantity: 2,
      position: 2,
      notified: false,
      createdAt: new Date('2024-01-23')
    }
  ]);

  const getTicketTypeIcon = (type: string) => {
    switch (type) {
      case 'vip':
        return Crown;
      case 'early-bird':
        return Zap;
      case 'group':
        return Users;
      case 'sponsor':
        return Star;
      case 'free':
        return Gift;
      default:
        return Ticket;
    }
  };

  const getTicketTypeColor = (type: string) => {
    switch (type) {
      case 'free':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'paid':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'vip':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'early-bird':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'group':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'sponsor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCurrentPrice = (ticket: TicketType) => {
    const now = new Date();
    const activeTier = ticket.pricingTiers.find(tier => 
      tier.isActive && now >= tier.startDate && now <= tier.endDate
    );
    return activeTier ? activeTier.price : ticket.basePrice;
  };

  const getNextPriceTier = (ticket: TicketType) => {
    const now = new Date();
    return ticket.pricingTiers.find(tier => 
      tier.isActive && tier.startDate > now
    );
  };

  const renderTicketsTab = () => (
    <div className="space-y-6">
      {/* Ticket Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$24,680</p>
              <p className="text-sm text-green-600">+18.2% from last event</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tickets Sold</p>
              <p className="text-2xl font-bold text-gray-900">142</p>
              <p className="text-sm text-blue-600">58% of total capacity</p>
            </div>
            <Ticket className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Ticket Price</p>
              <p className="text-2xl font-bold text-gray-900">$174</p>
              <p className="text-sm text-purple-600">Premium mix: 45%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">12.4%</p>
              <p className="text-sm text-orange-600">Above industry avg</p>
            </div>
            <Users className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Ticket Types</h3>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Ticket Type</span>
          </button>
        </div>
        
        <div className="divide-y divide-gray-200">
          {tickets.map((ticket) => {
            const Icon = getTicketTypeIcon(ticket.type);
            const currentPrice = getCurrentPrice(ticket);
            const nextTier = getNextPriceTier(ticket);
            const soldPercentage = (ticket.sold / ticket.quantity) * 100;
            
            return (
              <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg border ${getTicketTypeColor(ticket.type)}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{ticket.name}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTicketTypeColor(ticket.type)}`}>
                          {ticket.type.replace('-', ' ')}
                        </span>
                        {!ticket.isActive && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Inactive
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{ticket.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Current Price</p>
                          <p className="text-xl font-bold text-gray-900">${currentPrice}</p>
                          {nextTier && (
                            <p className="text-xs text-orange-600">
                              Next: ${nextTier.price} on {nextTier.startDate.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700">Sales Progress</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">
                              {ticket.sold}/{ticket.quantity}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({Math.round(soldPercentage)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${soldPercentage}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700">Revenue</p>
                          <p className="text-xl font-bold text-gray-900">
                            ${(ticket.sold * currentPrice).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            Avg: ${currentPrice}/ticket
                          </p>
                        </div>
                      </div>
                      
                      {/* Benefits */}
                      {ticket.benefits.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Benefits</p>
                          <div className="flex flex-wrap gap-1">
                            {ticket.benefits.slice(0, 3).map((benefit, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {benefit}
                              </span>
                            ))}
                            {ticket.benefits.length > 3 && (
                              <span className="text-xs text-gray-500 px-2 py-1">
                                +{ticket.benefits.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Settings Summary */}
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Min: {ticket.settings.minQuantity}</span>
                        <span>Max: {ticket.settings.maxQuantity}</span>
                        {ticket.settings.transferable && <span>Transferable</span>}
                        {ticket.settings.refundable && <span>Refundable</span>}
                        {ticket.settings.allowGroupBooking && (
                          <span>Group: {ticket.settings.groupDiscountPercentage}% off</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderPromotionalCodesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Promotional Codes</h3>
          <p className="text-sm text-gray-600">Manage discount codes and special offers</p>
        </div>
        <button
          onClick={() => setShowPromoModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Promo Code</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotionalCodes.map((promo) => (
          <div key={promo.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-indigo-600" />
                <span className="font-mono text-lg font-bold text-gray-900">{promo.code}</span>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                promo.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {promo.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{promo.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Discount</span>
                <span className="font-medium text-gray-900">
                  {promo.type === 'percentage' ? `${promo.value}%` : 
                   promo.type === 'fixed_amount' ? `$${promo.value}` : 
                   `Buy ${promo.buyXGetY?.buyQuantity} Get ${promo.buyXGetY?.getQuantity}`}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Usage</span>
                <span className="font-medium text-gray-900">
                  {promo.usedCount}/{promo.usageLimit}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${(promo.usedCount / promo.usageLimit) * 100}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Valid until {promo.validUntil.toLocaleDateString()}</span>
                <div className="flex items-center space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-700">
                    <Edit className="h-3 w-3" />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGroupBookingsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Group Bookings</h3>
          <p className="text-sm text-gray-600">Manage bulk ticket requests and corporate bookings</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity & Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groupBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.groupName}</div>
                      <div className="text-sm text-gray-500">
                        Requested: {booking.createdAt.toLocaleDateString()}
                      </div>
                      {booking.specialRequests && (
                        <div className="text-xs text-gray-400 mt-1">
                          Special requests: {booking.specialRequests}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.contactEmail}</div>
                    <div className="text-sm text-gray-500">{booking.contactPhone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.requestedQuantity} tickets
                    </div>
                    <div className="text-sm text-green-600">
                      {booking.discountPercentage}% group discount
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                      booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderWaitlistTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Waitlist Management</h3>
          <p className="text-sm text-gray-600">Manage attendees waiting for sold-out tickets</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          Notify Next in Line
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium text-gray-900">Waitlist Queue</h4>
            <span className="text-sm text-gray-600">{waitlist.length} people waiting</span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {waitlist.map((entry, index) => (
            <div key={entry.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">#{entry.position}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                    <div className="text-sm text-gray-500">{entry.email}</div>
                    {entry.phone && (
                      <div className="text-sm text-gray-500">{entry.phone}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {entry.requestedQuantity} ticket{entry.requestedQuantity > 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-gray-500">
                      Joined {entry.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {entry.notified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Notified
                      </span>
                    ) : (
                      <button className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors text-sm">
                        Notify
                      </button>
                    )}
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Ticketing System</h1>
          <p className="text-gray-600 mt-1">Comprehensive ticket management with dynamic pricing and promotions</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'tickets', label: 'Ticket Types', icon: Ticket },
            { id: 'promos', label: 'Promo Codes', icon: Tag },
            { id: 'groups', label: 'Group Bookings', icon: Users },
            { id: 'waitlist', label: 'Waitlist', icon: Clock }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'tickets' && renderTicketsTab()}
      {activeTab === 'promos' && renderPromotionalCodesTab()}
      {activeTab === 'groups' && renderGroupBookingsTab()}
      {activeTab === 'waitlist' && renderWaitlistTab()}

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Create New Ticket Type</h2>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ticket Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g., Early Bird, VIP"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ticket Type *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="paid">Paid</option>
                      <option value="free">Free</option>
                      <option value="vip">VIP</option>
                      <option value="early-bird">Early Bird</option>
                      <option value="group">Group</option>
                      <option value="sponsor">Sponsor</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Brief description of the ticket benefits"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Base Price ($)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="99"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max per Person
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pricing Tiers
                  </label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-3">
                      <input
                        type="text"
                        placeholder="Tier Name"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      + Add Another Tier
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ticket Settings
                  </label>
                  <div className="space-y-3">
                    {[
                      { key: 'transferable', label: 'Transferable' },
                      { key: 'refundable', label: 'Refundable' },
                      { key: 'requiresApproval', label: 'Requires Approval' },
                      { key: 'allowGroupBooking', label: 'Allow Group Booking' }
                    ].map((setting) => (
                      <label key={setting.key} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-gray-700">{setting.label}</span>
                      </label>
                    ))}
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
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  Create Ticket Type
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Promo Code Modal */}
      {showPromoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-500 to-blue-600">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Create Promotional Code</h2>
                <button
                  onClick={() => setShowPromoModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="px-6 py-6 overflow-y-auto max-h-96">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                    placeholder="SAVE20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type *
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="percentage">Percentage Off</option>
                    <option value="fixed_amount">Fixed Amount Off</option>
                    <option value="buy_x_get_y">Buy X Get Y</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usage Limit
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="100"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valid From
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valid Until
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowPromoModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  Create Promo Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{selectedTicket.name}</h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="px-6 py-6 overflow-y-auto max-h-96">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Pricing Tiers</h3>
                    <div className="space-y-2">
                      {selectedTicket.pricingTiers.map((tier) => (
                        <div key={tier.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{tier.name}</div>
                            <div className="text-sm text-gray-500">
                              {tier.startDate.toLocaleDateString()} - {tier.endDate.toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-lg font-bold text-gray-900">${tier.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Benefits</h3>
                    <div className="space-y-1">
                      {selectedTicket.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Sales Statistics</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Sold</span>
                        <span className="font-medium">{selectedTicket.sold}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Available</span>
                        <span className="font-medium">{selectedTicket.quantity - selectedTicket.sold}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Revenue</span>
                        <span className="font-medium">${(selectedTicket.sold * getCurrentPrice(selectedTicket)).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Settings</h3>
                    <div className="space-y-2">
                      {Object.entries(selectedTicket.settings).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-sm">
                            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  Edit Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedTicketManagement;