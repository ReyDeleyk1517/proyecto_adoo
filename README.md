# proyecto ADOO

Sistema web para **solicitar y administrar correos institucionales**, desarrollado como proyecto de la materia de **Análisis y Diseño Orientado a Objetos (ADOO)**.

La aplicación permite a los estudiantes registrar una solicitud (nombre, matrícula, CURP, correo, tipo y motivo), consultar el estado de su solicitud y, a los administradores, gestionar las solicitudes (aprobar, rechazar, actualizar o eliminar) desde un panel con inicio de sesión.

## Tecnologías

- **Backend:** Node.js, Express, Sequelize.
- **Base de datos:** MySQL (`mysql2`).
- **Autenticación:** sesiones con contraseñas cifradas (`bcrypt`).
- **Frontend:** HTML, CSS y JavaScript del lado del cliente (`public/`).

## Estructura

- `app.js` – arranque del servidor y configuración.
- `database.js` – conexión a la base de datos.
- `models/`, `controllers/`, `routes/` – lógica y endpoints (solicitudes y administración).
- `views/` – páginas (inicio, login, solicitar, estado, admin).
- `public/` – recursos estáticos y JavaScript del cliente.
- Diagramas y documentos de análisis (casos de uso, clases, paquetes, requerimientos).

## Participación de cada miembro

Bryan Dominguez y Tadeo Reyes desarrollaron el front end de la aplicacion, todo lo que se encuentra en la carpeta de views y la carpeta public/js, toda la logica para validar los datos de los usuarios en frontend, mandar las peticiones al backend y hacer el testeo de la aplicacion para que todo funcione correcto

Cuauhtemoc Sanchez desarrollo el backend de la aplicacion la conexion a la base de datos, la creacion de los models, los metodos de los controladores, el ruteo para las peticiooes entrantes y configuracion del servidor

Jared Alexis y Roberto Pacheco hicieron el analisis del sistema proporcionando al grupo de diseno los requerimientos del sistema, casos de uso asi como la elaboracion de todos los diagramas pertinentes, y la supervicion del desarrollo del sistema para garantizar que cumpla con los requerimientos establecidos

Aaron Flores y Jesus Dominguez con base a lo proporcionado por el grupo de analisis realizaron el diseno del sistema, tanto de las clases que se debian implementar, como los metodos, y los modelos para las tablas de la base de datos, asi como guiar y aclarar dudas al grupo de desarrollo

### Correr el proyecto

1.- Descargar el repositorio en su maquita

2.- Deben de tener instalado Node.js (Lo puedes descargar de aqui https://nodejs.org/en/, cualquiera de las dos versiones esta bien)

3.- Una vez descargado el proyecto en una terminal se situan en la carpeta del proyecto y dan el comando "npm install" (sin las comillas) el proyecto a a descargar unas dependencias

4.- Cuando termine de descargarlas dan el comando "npm start" (sin las comillas, antes hay que hacer los pasos de la configuracion de la base de datos)

5.- Para ver la pagina web en un navegador ingresar la url http://localhost:8000/

### Configurar la base de datos

Abrir el archivo "database.js" en cualquier editor de codigo, cambiar las credenciales por el mysql de su maquita (Igual y nada mas se ocuparia cambiar la contrasena, le ponen la que utilizan para entrar a mysql en POO2, la contrasena es donde dice "admin")

## Fecha de creación

El proyecto se creó el **7 de diciembre de 2021**.

> Aclaración: el proyecto fue creado originalmente en esa fecha y posteriormente migrado a este nuevo repositorio el **22 de octubre de 2026**. Por eso las fechas que muestra el sistema de archivos corresponden al momento de la migración y no a la fecha original de creación.
