import * as ExpoLocation from "expo-location";
import { useEffect, useState } from "react";
import Location from "../models/Location";

function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);

  const getLocation = async () => {
    try {
      const { granted } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (granted) {
        const lastKnownPosition = await ExpoLocation.getLastKnownPositionAsync();
        if (!lastKnownPosition) {
          return;
        }
        const { latitude, longitude } = lastKnownPosition.coords;
        setLocation({ latitude, longitude });
      } else {
        setLocation(null);
        return;
      }
    } catch (error: any) {
      alert("Error while getting location: " + error.message);
    }
  };
  
  useEffect(() => {
    getLocation();
  }, []);
  
  return location;
}

export default useLocation;