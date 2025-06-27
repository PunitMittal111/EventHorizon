export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'org_admin' | 'org_member';
  organizationId?: string;
  avatar?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  subscriptionPlan: 'basic' | 'premium' | 'enterprise';
  isActive: boolean;
  createdAt: Date;
  settings: {
    allowCustomDomain: boolean;
    maxEvents: number;
    maxTicketsPerEvent: number;
    customBranding: boolean;
  };
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  capacity: number;
  amenities: string[];
  images: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  organizationId: string;
}

export interface EventCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  isDefault: boolean;
  organizationId?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface PromotionalCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed_amount' | 'buy_x_get_y';
  value: number;
  description: string;
  usageLimit: number;
  usedCount: number;
  minQuantity?: number;
  maxQuantity?: number;
  validFrom: Date;
  validUntil: Date;
  applicableTicketTypes: string[];
  isActive: boolean;
  createdAt: Date;
  buyXGetY?: {
    buyQuantity: number;
    getQuantity: number;
  };
}

export interface GroupBooking {
  id: string;
  eventId: string;
  ticketTypeId: string;
  groupName: string;
  contactEmail: string;
  contactPhone: string;
  requestedQuantity: number;
  discountPercentage: number;
  specialRequests?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  approvedAt?: Date;
}

export interface WaitlistEntry {
  id: string;
  eventId: string;
  ticketTypeId: string;
  email: string;
  name: string;
  phone?: string;
  requestedQuantity: number;
  position: number;
  notified: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface Ticket {
  id: string;
  eventId: string;
  name: string;
  description: string;
  basePrice: number;
  pricingTiers: PricingTier[];
  quantity: number;
  sold: number;
  reserved: number;
  type: 'free' | 'paid' | 'vip' | 'early-bird' | 'group' | 'sponsor';
  salesStart: Date;
  salesEnd: Date;
  isActive: boolean;
  settings: {
    minQuantity: number;
    maxQuantity: number;
    transferable: boolean;
    refundable: boolean;
    requiresApproval: boolean;
    allowGroupBooking: boolean;
    groupDiscountPercentage?: number;
    groupMinQuantity?: number;
  };
  benefits: string[];
  restrictions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  shortDescription: string;
  startDate: Date;
  endDate: Date;
  timezone: string;
  venue?: Venue;
  virtualEventUrl?: string;
  eventType: 'in-person' | 'virtual' | 'hybrid';
  imageUrl: string;
  galleryImages: string[];
  category: EventCategory;
  customTags: string[];
  status: 'draft' | 'published' | 'cancelled' | 'completed' | 'archived';
  visibility: 'public' | 'private' | 'unlisted';
  maxAttendees: number;
  currentAttendees: number;
  tickets: Ticket[];
  promotionalCodes: PromotionalCode[];
  groupBookings: GroupBooking[];
  waitlist: WaitlistEntry[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  archivedAt?: Date;
  analytics: EventAnalytics;
  settings: {
    allowWaitlist: boolean;
    requireApproval: boolean;
    collectAttendeeInfo: boolean;
    enableQRCode: boolean;
    enableSocialSharing: boolean;
    enableComments: boolean;
    enableGroupBooking: boolean;
    autoApproveGroupBookings: boolean;
    waitlistAutoNotify: boolean;
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords: string[];
  };
}

export interface EventAnalytics {
  totalViews: number;
  uniqueViews: number;
  totalTicketsSold: number;
  totalRevenue: number;
  conversionRate: number;
  topTrafficSources: string[];
  geographicData: {
    country: string;
    visitors: number;
  }[];
  dailyStats: {
    date: string;
    views: number;
    sales: number;
    revenue: number;
  }[];
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  ticketSalesBreakdown: {
    ticketTypeId: string;
    ticketTypeName: string;
    sold: number;
    revenue: number;
  }[];
  promotionalCodeUsage: {
    codeId: string;
    code: string;
    usedCount: number;
    discountGiven: number;
  }[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  limits: {
    maxEvents: number;
    maxTicketsPerEvent: number;
    customBranding: boolean;
    analyticsAccess: boolean;
    apiAccess: boolean;
    venueManagement: boolean;
    customCategories: boolean;
  };
}