function UserLogin(email, password, setShowError) {
  console.log("Iniciando inicio de sesión: ", email);
  return fetch("http://localhost:8081/auth/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      console.log("Respuesta del servidor: ", response);
      if (response.ok) {
        console.log("Inicio de sesión correcto");
        return response.json();
      } else {
        console.error("Inicio de sesión incorrecto");
        alert("Inicio de sesión incorrecto");
        setShowError(true);
      }
    })
    .then((data) => {
      // data contendrá los datos del usuario si la respuesta fue exitosa
      console.log("Usuario encontrado: ", data);
      return data; // Devolver los datos del usuario para su uso posterior
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error en inicio de sesión");
    });
}

async function ApiLogin(id, token) {
  console.log("Iniciando inicio de sesión en la api: ", id);
  return fetch("http://localhost:8081/auth/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      token: token,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Cliente autenticado en la api");
      } else {
        console.error("El cliente no se ha podido autenticar en la api");
      }
    })
    .catch((error) => {
      console.error("Error al autenticar el cliente con la api:", error);
    });
}

export default UserLogin;
export { ApiLogin };
