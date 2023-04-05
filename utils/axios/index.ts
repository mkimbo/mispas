import axios from "axios";

export const registerUser = async (data: any) => {
  const response = await axios.post("/api/register-user", data);
  return response;
};

export const addPhoneNumber = async (data: { phoneNumber: string }) => {
  const response = await axios.post("/api/add-phone-number", data);
  return response;
};

export const verifyPhoneNumber = async (data: {
  phoneNumber: string;
  otp: string;
}) => {
  const response = await axios.post("/api/verify-phone-number", data);
  return response;
};

export const saveMissingPerson = async (data: any) => {
  const response = await axios.post("/api/report/missing", data);
  return response;
};

export const updateMissingPerson = async (data: any) => {
  const response = await axios.put("/api/report/missing", data);
  return response;
};

export const saveSighting = async (data: any) => {
  const response = await axios.put("/api/report/sighting", data);
  return response;
};

//export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const fetcher = (endpoint: string, token: string) =>
  fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: token || "unauthenticated",
    },
  });

export const fetchWithCookies = (endpoint: string, cookie: any) =>
  fetch(endpoint, {
    method: "GET",
    headers: {
      cookie: cookie,
    },
    credentials: "include",
  });
