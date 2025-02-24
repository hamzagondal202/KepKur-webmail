import axios from "axios";
import env from "../env.json";

export const getOutboxItems = async () => {
  try {
    const response = await axios.get(`${env.url}/api/email/sent`);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
