import axios from "axios";

const saveData = async (data: any) => {
  const response = await axios.post("api/report/missing", data);
  return response;
};
