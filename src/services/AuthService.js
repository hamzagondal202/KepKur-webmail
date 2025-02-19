import axios from "axios";
import env from "../env.json";

export const login = async (credentails) => {
  try {
    const response = await axios.post(`${env.url}/login`, {
      id: credentails.id,
      password: credentails.password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
