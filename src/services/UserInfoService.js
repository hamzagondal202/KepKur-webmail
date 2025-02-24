import axios from "axios";
import env from "../env.json";

export const getDashboardInfo = async () => {
  try {
    const response = await axios.get(`${env.url}/api/storage/info`);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
