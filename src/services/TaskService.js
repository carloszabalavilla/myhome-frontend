import axios from "./AxiosInstance";

const serviceURL = "/task";

export async function GetUserTasks(userId) {
  try {
    const response = await axios.get(`${serviceURL}/user?id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

export async function AddTask(task) {
  try {
    const response = await axios.post(`${serviceURL}`, task); 
    console.log("Respuesta del servidor: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}
