async function NewUser(email, password) {
  console.log("Iniciando creacion de usuario: ", email);
  try {
    const response = await fetch("http://localhost:8081/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'cors',
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

export default NewUser;
