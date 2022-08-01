import geofire from "geofire-common";
export const loadScript = (
  src: string,
  position: HTMLElement | null,
  id: string
) => {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
};

export const getGeoHash = (_geoloc: google.maps.LatLngLiteral) => {
  try {
    const hash = geofire?.geohashForLocation([
      _geoloc.lat,
      _geoloc.lng,
    ]);
    return hash;
  } catch (error) {
    console.log("error getting geohash", error);
  }
};
