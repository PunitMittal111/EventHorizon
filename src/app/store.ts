import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import eventReducer from "../features/eventSlice";
import ticketReducer from "../features/ticketSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    tickets: ticketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
