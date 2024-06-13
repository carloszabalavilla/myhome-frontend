import axios from "./AxiosInstance";

const serviceURL = "/user";

export async function CheckEmail(email) {
  try {
    const response = await axios.get(`${serviceURL}/check/${email}`);
    console.log("Respuesta del servidor: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}

export async function GetUserByEmail(email) {
  try {
    const response = await axios.get(`${serviceURL}/email?email=${email}`);
    console.log("Respuesta del servidor: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
