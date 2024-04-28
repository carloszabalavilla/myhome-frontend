function NewUser(email, password, password2) {
  console.log("Iniciando creacion de usuario: ", email);
  if (password !== password2) {
    alert("Las contraseñas no coinciden");
    return;
  }
  return fetch("http://localhost:8081/users/user/register", {
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
        alert("Usuario creado correctamente");
      } else {
        alert("No se ha podido crear el usuario");
      }
    })
    .catch((error) => {
      console.error("Error al crear el usuario:", error);
      alert("Error al crear el usuario");
    });
}

export default NewUser;
