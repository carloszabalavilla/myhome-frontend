function UserLogin(email, password) {
  console.log("Iniciando inicio de sesión: ", email);
  return fetch("http://localhost:8081/auth/login", {
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
        return null;
      }
    })
    .then((data) => {
      // data contendrá los datos del usuario si la respuesta fue exitosa
      console.log("Usuario encontrado: ", data);
      return data; // Devolver los datos del usuario para su uso posterior
    })
    .catch((error) => {
      console.error("Error:", error);
      return null;
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

function PasswordRecovery(email) {
  console.log("Iniciando recuperacion de email: ", email);

  return fetch("http://localhost:8081/auth/user/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Se ha enviado un correo para recuperar la contraseña");
      } else {
        alert("No se ha podido enviar el correo para recuperar la contraseña");
      }
    })
    .catch((error) => {
      console.error(
        "Error al enviar el correo para recuperar la contraseña:",
        error
      );
      alert("Error al enviar el correo para recuperar la contraseña");
    });
}

function PasswordChange(password, password2) {
  console.log("Iniciando cambio de contraseña");
  if (password !== password2) {
    alert("Las contraseñas no coinciden");
    return;
  }

  return fetch("http://localhost:8081/auth/user/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Contraseña cambiada correctamente");
      } else {
        alert("No se ha podido cambiar la contraseña");
      }
    })
    .catch((error) => {
      console.error("Error al cambiar la contraseña:", error);
      alert("Error al cambiar la contraseña");
    });
}
export default UserLogin;
export { ApiLogin };
export { PasswordRecovery };
export { PasswordChange };
