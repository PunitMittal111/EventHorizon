import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Event } from "../types";

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
      });
  },
});

export const { clearCreateError, clearError } = eventSlice.actions;
export default eventSlice.reducer;

//  <div>
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

// <div className="flex items-center justify-between mb-2">
//   <div className="flex items-center space-x-2">
//     <div
//       className="w-3 h-3 rounded-full"
//       style={{ backgroundColor: event.category.color }}
//     />
//     <span className="text-sm text-gray-600">{event.category.name}</span>
//   </div>
//   <span className="text-sm text-gray-500">
//     {event.visibility === "private"
//       ? "🔒"
//       : event.visibility === "unlisted"
//       ? "🔗"
//       : "🌐"}
//   </span>
// </div>;

// {
// event.customTags.length > 0 && (
//   <div className="flex items-center mb-4">
//     <Tag className="h-4 w-4 mr-2 text-gray-400" />
//     <div className="flex flex-wrap gap-1">
//       {event.customTags.slice(0, 3).map((tag, index) => (
//         <span
//           key={index}
//           className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
//         >
//           {tag}
//         </span>
//       ))}
//       {event.customTags.length > 3 && (
//         <span className="text-xs text-gray-500">
//           +{event.customTags.length - 3} more
//         </span>
//       )}
//     </div>
//   </div>
// );
// }
