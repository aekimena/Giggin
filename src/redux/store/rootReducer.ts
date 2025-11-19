import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authReducer";
import RegData from "../features/RegistrationData";
import UserData from "../features/UserData";
import ClientConvos from "../features/client/Messages";
import ArtisanConvos from "../features/artisan/Messages";

const combinedReducer = combineReducers({
  auth: authReducer,
  RegData,

  UserData,
  ClientConvos,
  ArtisanConvos,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
