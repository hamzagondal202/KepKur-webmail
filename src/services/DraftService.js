import axios from "axios";
import env from "../env.json";

export const getDraftItems = async () => {
  try {
    const response = await axios.get(`${env.url}/api/email/drafts`);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
