# MyHome · demostración local

Requisitos: Java 17 y Node.js 22 o 24. El paquete preparado incluye el JAR y la interfaz compilados; no necesita MySQL, Maven, npm install ni servicios externos para ejecutarse.

Extrae el ZIP completo y ejecuta `node start.cjs` (o `Iniciar.cmd` en Windows). Cuando indique que está listo, abre http://localhost:3000. Acceso ficticio: `demo@example.invalid` / `DemoOnly123!`. Detén con Ctrl+C. Los datos H2 se eliminan al detener la aplicación.

Recorridos incluidos: iniciar/cerrar sesión, crear/consultar/actualizar/eliminar tareas mediante la API y calendario de tareas, crear un grupo familiar y consultar el grupo guardado. Registro, confirmación y recuperación generan correos en `.runtime/mail/`; abre el archivo local y visita su enlace. No se envía correo real. Los tokens cambian en cada arranque.

El proyecto original tiene módulos sin implementar: finanzas, nutrición, perfil y gestión de miembros/invitaciones. La demo conserva esa indicación; no los presenta como terminados. La API aún requiere una revisión de autorización por propietario antes de cualquier publicación en Internet. Esta distribución solo escucha en la máquina local.

## Reproducir desde código

1. Conserva los repositorios `myhome-backend` y `myhome-frontend` en carpetas hermanas.
2. Backend: desde `myhome-backend/myhome`, ejecuta `mvnw.cmd clean verify` (Linux/macOS: `bash ./mvnw clean verify`), con JDK17 y JAVA_HOME.
3. Frontend: `npm ci`, `npm run lint`, `npm test -- --watchAll=false --runInBand`, `npm run build`.
4. Desde el frontend: `node scripts/local-demo.cjs`. Puedes indicar otro JAR con la variable `MYHOME_BACKEND_JAR`.

Las licencias del scheduler están en `THIRD_PARTY_LICENSES`. No reutilices credenciales históricas del repositorio. El perfil H2 no certifica funcionamiento con MySQL externo.
