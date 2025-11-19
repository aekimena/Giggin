import { createSlice } from "@reduxjs/toolkit";

type InitialStateProps = {
  userData: UserDataProps;
};

const initialState: InitialStateProps = {
  userData: null,
};

// const userDataSlice = createSlice({
//   name: "userDataSlice",
//   initialState: initialState,
//   reducers: {
//     updateUserData: (state, action) => {
//       state.userData = action.payload;
//     },
//     delUserData: (state) => {
//       state.userData = null;
//     },
//   },
// });

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER_DATA":
      return { ...state, userData: action.payload };
    case "DELETE_USER_DATA":
      return { ...state, userData: null };
    default:
      return state;
  }
};

// export const { updateUserData, delUserData } = userDataSlice.actions;
export default userReducer;
export const selectUserData = (state: any) => state.UserData.userData;
