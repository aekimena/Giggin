import { createSlice } from "@reduxjs/toolkit";

type InitialStateProps = {
  userData: UserDataProps;
};

const initialState: InitialStateProps = {
  userData: null,
};

const userDataSlice = createSlice({
  name: "userDataSlice",
  initialState: initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    delUserData: (state) => {
      state.userData = null;
    },
  },
});

export const { updateUserData, delUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
export const selectUserData = (state: any) => state.UserData.userData;
