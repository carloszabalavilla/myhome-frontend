import axios from "../contexts/AxiosInstance";

const serviceURL = "/user";

export default async function GetUserByToken(token) {
  try {
    const response = await axios.get(
      `${serviceURL}/token?token=${token}`
    );
    console.log("Respuesta del servidor: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
