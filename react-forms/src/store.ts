import { configureStore } from "@reduxjs/toolkit";
import formDataReducer from "./formDataSlice";
import countriesReducer from "./countries";

export const store = configureStore({
  reducer: {
    formData: formDataReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
