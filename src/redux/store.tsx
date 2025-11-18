import { configureStore } from "@reduxjs/toolkit";
import RegData from "./features/RegistrationData";
import UserData from "./features/UserData";
import ClientConvos from "./features/client/Messages";
import ArtisanConvos from "./features/artisan/Messages";

export default configureStore({
  reducer: {
    RegData,
    UserData,
    ClientConvos,
    ArtisanConvos,
  },
});
