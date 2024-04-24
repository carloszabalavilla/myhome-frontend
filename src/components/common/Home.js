import React from "react";

function Home() {
  console.log("Redirigiendo a la página de inicio.");
  return (
    <div className="container">
      <h1 className="mt-5">¡Bienvenido a MyHome!</h1>
      <p className="lead">
        Tu lugar para administrar tu hogar de manera fácil y eficiente.
      </p>
    </div>
  );
}

export default Home;
