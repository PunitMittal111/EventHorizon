import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import eventReducer from '../features/eventSlice'; // ✅ Correct relative path

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer, // ✅ Registering eventSlice reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
