async function UserLogin(email, password,user) {
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
      if (response.ok) {
        alert("Inicio de sesión correcto");
        user.login=true;
      } else {
        alert("Inicio de sesión incorrecto");
      }      
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error en inicio de sesión")
    });
}

async function ApiLogin(email, password) {
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
