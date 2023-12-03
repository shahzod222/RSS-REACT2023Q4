import { createSlice } from "@reduxjs/toolkit";

const countriesSlice = createSlice({
  name: "countries",
  initialState: [
    { label: "USA", value: "USA" },
    { label: "Canada", value: "Canada" },
    { label: "Germany", value: "Germany" },
    { label: "France", value: "France" },
  ],
  reducers: {},
});

export default countriesSlice.reducer;
