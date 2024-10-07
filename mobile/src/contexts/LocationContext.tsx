import React, { createContext, useState, useEffect, Context } from "react";
import useLocation from "../hooks/useLocation";
import Location from "../models/Location";

type ContextProps = {
  location: Location | null;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
};

export const LocationContext: Context<ContextProps> = createContext({
  location: null,
  setLocation: () => {}
} as ContextProps);


export const LocationProvider = (props: any) => {

  // Location states
  const currentLocation = useLocation();
  const [location, setLocation] = useState<Location | null>(null);

  // Update location by current location on mount
  useEffect(() => {
    if (!location && currentLocation) {
      setLocation(currentLocation);
    }
  }, [currentLocation]);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};