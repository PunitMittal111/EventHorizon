import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Event } from '../types';

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
};

// Async Thunks
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get('/api/events');
  return response.data;
});

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData: Partial<Event>) => {
    const response = await axios.post('/api/events', eventData);
    return response.data;
  }
);

// Local action for adding event without API call (for development/testing)
export const addEventLocally = createAsyncThunk(
  'events/addEventLocally',
  async (eventData: Partial<Event>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create complete event object
    const newEvent: Event = {
      id: Date.now().toString(),
      organizationId: 'org-1',
      title: eventData.title || '',
      description: eventData.description || '',
      shortDescription: eventData.shortDescription || '',
      startDate: eventData.startDate || new Date(),
      endDate: eventData.endDate || new Date(),
      timezone: eventData.timezone || 'America/New_York',
      eventType: eventData.eventType || 'in-person',
      imageUrl: eventData.imageUrl || 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
      galleryImages: eventData.galleryImages || [],
      category: eventData.category || {
        id: '1',
        name: 'Technology',
        description: 'Tech conferences and meetups',
        color: '#3B82F6',
        icon: 'Laptop',
        isDefault: true
      },
      customTags: eventData.customTags || [],
      status: eventData.status || 'draft',
      visibility: eventData.visibility || 'public',
      maxAttendees: eventData.maxAttendees || 100,
      currentAttendees: 0,
      tickets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: eventData.status === 'published' ? new Date() : undefined,
      analytics: {
        totalViews: 0,
        uniqueViews: 0,
        totalTicketsSold: 0,
        totalRevenue: 0,
        conversionRate: 0,
        topTrafficSources: [],
        geographicData: [],
        dailyStats: [],
        deviceStats: { desktop: 0, mobile: 0, tablet: 0 }
      },
      settings: eventData.settings || {
        allowWaitlist: true,
        requireApproval: false,
        collectAttendeeInfo: true,
        enableQRCode: true,
        enableSocialSharing: true,
        enableComments: false
      },
      seo: eventData.seo || {
        metaTitle: eventData.title || '',
        metaDescription: eventData.shortDescription || '',
        keywords: eventData.customTags || []
      },
      venue: eventData.venue,
      virtualEventUrl: eventData.virtualEventUrl
    };
    
    return newEvent;
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearCreateError: (state) => {
      state.createError = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      })
      
      // Create Event (API)
      .addCase(createEvent.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.createLoading = false;
        state.events.unshift(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.error.message || 'Failed to create event';
      })
      
      // Add Event Locally (for development)
      .addCase(addEventLocally.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(addEventLocally.fulfilled, (state, action: PayloadAction<Event>) => {
        state.createLoading = false;
        state.events.unshift(action.payload);
      })
      .addCase(addEventLocally.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.error.message || 'Failed to create event';
      });
  },
});

export const { clearCreateError, clearError } = eventSlice.actions;
export default eventSlice.reducer;