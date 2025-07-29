import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Plan {
  _id: string;
  name: "Starter" | "Professional" | "Enterprise";
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
}

interface PlanState {
  plans: Plan[];
  selectedPlan: Plan | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlanState = {
  plans: [],
  selectedPlan: null,
  loading: false,
  error: null,
};

const API_URL = "http://localhost:5000";

// Get all active plans
export const getAllPlans = createAsyncThunk(
  "plans/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/plans`);
      return res.data.data as Plan[];
    } catch (error: any) {
      console.log("Get all plans error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch plans"
      );
    }
  }
);

// Get a plan by ID
export const getPlanById = createAsyncThunk(
  "plans/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/plans/${id}`);
      return res.data.data as Plan;
    } catch (error: any) {
      console.log("Get plan by ID error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch plan"
      );
    }
  }
);

// Get popular plans
export const getPopularPlans = createAsyncThunk(
  "plans/getPopular",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/plans/popular`);
      return res.data.data as Plan[];
    } catch (error: any) {
      console.log("Get popular plans error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch popular plans"
      );
    }
  }
);

const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    clearPlanError: (state) => {
      state.error = null;
    },
    clearSelectedPlan: (state) => {
      state.selectedPlan = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllPlans
      .addCase(getAllPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPlans.fulfilled,
        (state, action: PayloadAction<Plan[]>) => {
          state.loading = false;
          state.plans = action.payload;
        }
      )
      .addCase(getAllPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getPlanById
      .addCase(getPlanById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedPlan = null;
      })
      .addCase(getPlanById.fulfilled, (state, action: PayloadAction<Plan>) => {
        state.loading = false;
        state.selectedPlan = action.payload;
      })
      .addCase(getPlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getPopularPlans
      .addCase(getPopularPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPopularPlans.fulfilled,
        (state, action: PayloadAction<Plan[]>) => {
          state.loading = false;
          state.plans = action.payload;
        }
      )
      .addCase(getPopularPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPlanError, clearSelectedPlan } = planSlice.actions;
export default planSlice.reducer;
