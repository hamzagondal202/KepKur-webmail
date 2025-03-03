import axios from "axios";
import env from "../env.json";

export const getEvidenceBoxItems = async (page, limit) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${env.url}/api/evidence/list?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const searchEvidenceBoxItems = async (
  page,
  limit,
  subject,
  buyer,
  startDate,
  endDate
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${env.url}/api/evidence/search?page=${page}&limit=${limit}&subject=${subject}&buyer=${buyer}&start_date=${startDate}&end_date=${endDate}`,
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
