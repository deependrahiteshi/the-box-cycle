import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/store/app/authentication/AuthSlice";

export const store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
