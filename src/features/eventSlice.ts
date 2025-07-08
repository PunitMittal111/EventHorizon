import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Event } from "../types";

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
  selectedEvent: Event | null;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  selectedEvent: null,
};

const API_URL = "http://localhost:5000";

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData: Partial<Event>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/api/events`,
        { ...eventData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response?.data;
    } catch (error: any) {
      console.log("Create event error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create event"
      );
    }
  }
);

export const getAllEvents = createAsyncThunk(
  "events/getAll",
  async (
    {
      status = "all",
      type = "all",
      search = "",
    }: { status?: string; type?: string; search?: string } = {},
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem("token");

    try {
      const queryParams = new URLSearchParams();
      if (status && status !== "all") queryParams.append("status", status);
      if (type && type !== "all") queryParams.append("type", type);
      if (search) queryParams.append("search", search);

      const res = await axios.get(
        `${API_URL}/api/events?${queryParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data as Event[];
    } catch (error: any) {
      console.log("Get all events error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch events"
      );
    }
  }
);

export const getEventById = createAsyncThunk(
  "events/getById",
  async (id: string, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API_URL}/api/events/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data as Event;
    } catch (error: any) {
      console.log("Get event by id error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch event"
      );
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearCreateError: (state) => {
      state.createError = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.createError = action.error.message || "Failed to create event";
      })

      .addCase(getAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.loading = false;
          state.events = action.payload;
        }
      )
      .addCase(getAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch events";
      })

      .addCase(getEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedEvent = null;
      })
      .addCase(
        getEventById.fulfilled,
        (state, action: PayloadAction<Event>) => {
          state.loading = false;
          state.selectedEvent = action.payload;
        }
      )
      .addCase(getEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch event";
      });
  },
});

export const { clearCreateError, clearError } = eventSlice.actions;
export default eventSlice.reducer;
