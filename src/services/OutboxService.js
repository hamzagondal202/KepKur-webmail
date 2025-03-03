import axios from "axios";
import env from "../env.json";

export const getOutboxItems = async (page, limit) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${env.url}/api/email/sent?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchOutboxItems = async (
  page,
  limit,
  subject,
  sender,
  startDate,
  endDate
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${env.url}/api/email/sent/search?page=${page}&limit=${limit}&subject=${subject}&sender=${sender}&start_date=${startDate}&end_date=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
