import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import eventReducer from "../features/eventSlice";
import ticketReducer from "../features/ticketSlice";
import planReducer from "../features/planSlice";
// import subscriptionReducer from "../features/subscriptionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    tickets: ticketReducer,
    plans: planReducer,
    // subscriptions: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
