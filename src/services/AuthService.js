import axios from "../contexts/AxiosInstance";

const serviceURL = "/auth";

async function UserLogin(email, password, setMessage, setSendConfLink) {
  console.log("Iniciando inicio de sesión: ", email);

  try {
    const response = await axios.post(`${serviceURL}/login`, {
      email,
      password,
    });
    console.log("Respuesta del servidor: ", response.data);
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      setSendConfLink(true);
    }
    console.error("Error: ", error);
    setMessage(error.response.data.message);
    return null;
  }
}

async function RecoveryPassword(email, setMessage) {
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

async function ChangePassword(email, password, password2, setMessage) {
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

async function NewUser(email, password) {
  console.log("Iniciando creacion de usuario: ", email);

  try {
    const response = await fetch("http://localhost:8081/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log("Respuesta del servidor: ", response);
    if (response.ok) {
      console.log("Registro correcto");
      const data = await response.json();
      if (data === null) {
        console.error("Email ya registrado");
        return null;
      } else {
        console.log("Usuario registrado: ", data);
        return data;
      }
    } else {
      console.error("Error en el registro");
      return "registerError";
    }
  } catch (error) {
    console.error("Error: ", error);
    return "registerError";
  }
}

async function ResendConfirmation(email, setMessage) {
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

export default UserLogin;
export { ResendConfirmation };
export { NewUser };
export { RecoveryPassword };
export { ChangePassword };
