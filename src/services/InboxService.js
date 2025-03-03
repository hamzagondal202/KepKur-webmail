import axios from "axios";
import env from "../env.json";

export const getInboxItems = async (page, limit) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${env.url}/api/email/inbox?page=${page}&limit=${limit}`,
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

export const searchInboxItems = async (
  page,
  limit,
  readStatus,
  subject,
  sender,
  startDate,
  endDate
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${env.url}/api/email/inbox/search?page=${page}&limit=${limit}&read_status=${readStatus}&subject=${subject}&sender=${sender}&start_date=${startDate}&end_date=${endDate}`,
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
