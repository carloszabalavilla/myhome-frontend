import axios from "../contexts/AxiosInstance";

const serviceURL = "/auth";

export async function NewUser(email, password, setMessage) {
  console.log("Iniciando creacion de usuario: ", email);

  try {
    const response = await axios.post(`${serviceURL}/register`, {
      email,
      password,
    });
    console.log(" Mensaje de respuesta del servidor: ", response.data.message);
    setMessage(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    setMessage(error.response.data.message);
    return null;
  }
}

export async function UserLogin(email, password) {
  console.log("Iniciando servicio de login");
  try {
    const response = await axios.post(`${serviceURL}/login`, {
      email,
      password,
    });
    console.log("Respuesta del servidor: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

export async function RecoveryPassword(email, setMessage) {
  console.log("Iniciando recuperacion de email: ", email);

  try {
    const response = await axios.get(
      `${serviceURL}/recovery-password/${email}`
    );
    console.log("Respuesta del servidor: ", response.data);
    console.log("Mensaje del servidor: ", response.data.message);

    return response.data.message;
  } catch (error) {
    console.error("Error: ", error);
    setMessage(error.response.data.message);
    return null;
  }
}

export async function ChangePassword(email, password, password2, setMessage) {
  console.log("Iniciando cambio de contraseña");
  if (password !== password2) {
    setMessage("Las contraseñas no coinciden");
    return null;
  }

  try {
    const response = await axios.put(`${serviceURL}/reset-password`, {
      email,
      password,
    });
    console.log("Respuesta del servidor: ", response.data);
    return response.data.message;
  } catch (error) {
    console.error("Error: ", error);
    setMessage(error.response.data.message);
    return null;
  }
}

export async function ResendConfirmation(email, setMessage) {
  console.log("Iniciando inicio de sesión: ", email);

  try {
    const response = await axios.post(
      `${serviceURL}/resend-confirmation?email=${email}`,
      {}
    );
    console.log("Respuesta del servidor: ", response.data);
  } catch (error) {
    console.error("Error: ", error);
    setMessage(error.response.data.message);
  }
}
