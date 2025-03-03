import axios from "axios";
import env from "../env.json";

export const getAddressBookItems = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${env.url}/api/contacts/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
