import axios from "axios";

const saveData = async (data: any) => {
  const response = await axios.post("api/report/missing", data);
  return response;
};

export const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data);
