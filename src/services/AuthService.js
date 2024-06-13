import axios from "./AxiosInstance";

const serviceURL = "/auth";

export async function NewUser(userData) {
  console.log("Iniciando creacion de usuario: ", userData.email);

  try {
    const response = await axios.post(`${serviceURL}/register`, userData);
    console.log(" Mensaje de respuesta del servidor: ", response.data.message);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}

export async function UserLogin(loginRequest) {
  try {
    const response = await axios.post(`${serviceURL}/login`, loginRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function StartRecovery(email) {
  try {
    const response = await axios.get(
      `${serviceURL}/recovery-password/start/${email}`
    );
    return response.data.message;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

export async function LetRecoveryPassword(jwt) {
  try {
    const response = await axios.get(`${serviceURL}/recovery-password/let`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

export async function ChangePassword(jwt, resetRequest) {
  try {
    const response = await axios.post(
      `${serviceURL}/recovery-password/change`,
      resetRequest,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    console.log("Respuesta del servidor: ", response.data);
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

export async function ResendConfirmation(email) {
  try {
    const response = await axios.get(
      `${serviceURL}/resend-confirmation/${email}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
