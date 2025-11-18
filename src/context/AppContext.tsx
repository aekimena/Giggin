import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useRef, useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  // bottom sheet refs for artisan category filter
  const ArtisanRegionRef = useRef();
  const ArtisanCityRef = useRef();
  const ArtisanFeesRef = useRef();

  // these are useStates for artisan category filter
  const [regionInput, setRegionInput] = useState("");

  // this is state for artisan services
  const [services, setServices] = useState<Array<ArtisanServicesProps>>([]);
  return (
    <AppContext.Provider
      value={{
        ArtisanCityRef,
        ArtisanFeesRef,
        ArtisanRegionRef,
        regionInput,
        setRegionInput,
        services,
        setServices,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
