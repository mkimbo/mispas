import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "../i18n";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { useAuthUser } from "next-firebase-auth";
import { getGeoHash } from "../utils/functions";
//import useAuth from "../hook/auth";

type Props = {};

export default function GetLocation({}: Props) {
  const t = useTranslation();
  const authUser = useAuthUser();
  const handleGetLocation = () => {
    const successCallback = async (geoPosition) => {
      //console.log(geoPocation, "location");
      const position = {
        lat: geoPosition?.coords?.latitude,
        lng: geoPosition?.coords?.longitude,
      };
      const geohash = getGeoHash(position);
      const _geoloc = {
        geohash: geohash,
        lat: geoPosition?.coords?.latitude,
        lng: geoPosition?.coords?.longitude,
      };
      const response = await axios.put("/api/create_user", {
        uid: authUser?.id,
        _geoloc,
        enabledLocation: true,
      });
      if (response?.data) {
        //Todo
        //setUser({ ...user, enabledLocation: true });

        return true;
      } else {
        return false;
      }
    };

    const errorCallback = (error) => {
      console.log(error);
    };

    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    };

    if ("geolocation" in navigator) {
      // Access the API
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        geolocationOptions
      );
    } else {
      // Use a third-party geolocation service
      console.log("Browser does not support the Geolocation API");
    }
  };
  return (
    <Button
      onClick={handleGetLocation}
      variant="outlined"
      size="large"
      startIcon={<LocationOnIcon fontSize="small" />}
    >
      {t("Update Location")}
    </Button>
  );
}
