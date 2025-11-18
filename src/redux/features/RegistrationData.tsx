import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

type InitialStateProps = {
  registerData: UserDataProps;
};

const initialState: InitialStateProps = {
  registerData: null,
};

const RegisterSlice = createSlice({
  name: "RegisterSlice",
  initialState: initialState,
  reducers: {
    updateRegisterData: (state, action) => {
      state.registerData = action.payload;
    },
    delRegisterData: (state, action) => {
      state.registerData = null;
    },
  },
});

export const { updateRegisterData, delRegisterData } = RegisterSlice.actions;
export default RegisterSlice.reducer;

export const selectRegData = (state: any) => state.RegData.registerData;
