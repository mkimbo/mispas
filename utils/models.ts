export type TNav = {
  href: string;
  icon: React.ReactElement;
};
export type TReportSighting = {
  sightingLocation: string;
  sightingDate: string;
};

export type IReportMissing = {
  fullname: string;
  age: number;
  gender: string;
  complexion: string;
  image: File;
  lastSeenLocation: string;
  lastSeenDate: string;
  lastWearing: string;
  nickname: string;
  obNumber: string;
  phoneContact1: string;
  phoneContact2: string;
  policeStationName: string;
  relationToReported: string;
};

export type TNotification = {
  title: string;
  body: string;
  icon: string;
  click_action: string;
};
export type TNotificationInput = {
  center: number[];
  radius?: number;
  notification: TNotification;
};
export type TUserDevice = {
  token: string;
  userId: string;
};

export type TLocation = {
  lng: number;
  lat: number;
  address: string;
  geohash: string;
};

export type TGeoLoc = {
  lng: number;
  lat: number;
};
