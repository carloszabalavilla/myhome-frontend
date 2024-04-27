async function PasswordRecovery(email) {
    console.log("Iniciando recuperacion de email: ", email);

  return fetch("http://localhost:8081/user/passwordRecovery", {
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
      console.error("Error al enviar el correo para recuperar la contraseña:", error);
      alert("Error al enviar el correo para recuperar la contraseña")
    });
}

async function PasswordChange(email, password) {
    console.log("Iniciando cambio de contraseña: ", email);
  return fetch("http://localhost:8081/user/passwordChange", {
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
        alert("Contraseña cambiada correctamente");
      } else {
        alert("No se ha podido cambiar la contraseña");
      }      
    })
    .catch((error) => {
      console.error("Error al cambiar la contraseña:", error);
      alert("Error al cambiar la contraseña")
    });
}

function NewUser(email, password, name, surname) {
    console.log("Iniciando creacion de usuario: ", email);
  return fetch("http://localhost:8081/user/newUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      surname: surname,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Usuario creado correctamente");
      } else {
        alert("No se ha podido crear el usuario");
      }      
    })
    .catch((error) => {
      console.error("Error al crear el usuario:", error);
      alert("Error al crear el usuario")
    });
}

export default PasswordRecovery;
export { PasswordChange };
export { NewUser };