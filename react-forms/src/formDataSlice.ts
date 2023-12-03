import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  country: string;
  picture: string | null | undefined;
}

const initialState: FormData = {
  name: "",
  age: 0,
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  acceptTerms: false,
  country: "",
  picture: null,
};

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      return { ...state, ...action.payload };
    },
    setPicture: (state, action: PayloadAction<string | null>) => {
      state.picture = action.payload;
    },
  },
});

export const { setFormData, setPicture } = formDataSlice.actions;
export default formDataSlice.reducer;
