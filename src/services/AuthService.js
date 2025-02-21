import axios from "axios";
import env from "../env.json";

export const login = async (credentails) => {
  try {
    const requestBody = {
      tc_number: credentails.id,
      password: credentails.password,
    };
    console.log(requestBody);
    const response = await axios.post(
      `${env.url}/api/account/check-user`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const selectAccount = async (credentails) => {
  try {
    const requestBody = {
      account_id: Number(credentails.account_id),
    };
    console.log(requestBody);
    const response = await axios.post(
      `${env.url}/api/account/select-kep-account`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const smsOtp = async (credentails) => {
  try {
    const requestBody = {
      account_id: Number(credentails.account_id),
      otp: credentails.otp,
    };
    console.log(requestBody);
    const response = await axios.post(
      `${env.url}/api/account/login-otp`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const loginEsign = async () => {
  try {
    const response = await axios.get(`${env.url}/api/account/login-esign`);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
