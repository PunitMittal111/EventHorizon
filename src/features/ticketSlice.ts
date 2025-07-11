import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Ticket {
  _id: string;
  eventId: string | { _id: string; title: string };
  name: string;
  description?: string;
  price: number;
  quantity: number;
  sold?: number;
  type: "paid" | "free" | "VIP";
  salesStart: string;
  salesEnd: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
}

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
};

const API_URL = "http://localhost:5000";

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticketData: Partial<Ticket>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/api/tickets`, ticketData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data as Ticket;
    } catch (error: any) {
      console.log("Create ticket error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create ticket"
      );
    }
  }
);

export const getAllTickets = createAsyncThunk(
  "tickets/getAllTickets",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/tickets`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data as Ticket[];
    } catch (error: any) {
      console.log("Get all tickets error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tickets"
      );
    }
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    clearTicketError: (state) => {
      state.error = null;
    },
    clearTicketCreateError: (state) => {
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(
        createTicket.fulfilled,
        (state, action: PayloadAction<Ticket>) => {
          state.createLoading = false;
          state.tickets.push(action.payload);
        }
      )
      .addCase(createTicket.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
      })
      .addCase(getAllTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllTickets.fulfilled,
        (state, action: PayloadAction<Ticket[]>) => {
          state.loading = false;
          state.tickets = action.payload;
        }
      )
      .addCase(getAllTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTicketError, clearTicketCreateError } = ticketSlice.actions;
export default ticketSlice.reducer;
