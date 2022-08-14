const geofire = require("geofire-common");
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

export const getGeoHash = (_geoloc: { lat: number; lng: number }) => {
  const hash = geofire?.geohashForLocation([
    _geoloc.lat,
    _geoloc.lng,
  ]);
  return hash;
};
