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
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.error.message || 'Failed to create event';
      });
  },
});

export const { clearCreateError, clearError } = eventSlice.actions;
export default eventSlice.reducer;