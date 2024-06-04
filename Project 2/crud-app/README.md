# Guía de Instalación y Uso

Esta es una guía para la instalación y uso del proyecto, el cual consiste en una aplicación CRUD para gestionar una base de datos MySQL.

## Requisitos Previos

Antes de comenzar con la instalación y uso de este proyecto, asegúrate de tener los siguientes requisitos previos:

- Base de datos MySQL creada previamente con los scripts proporcionados.
- Base de datos MySQL en ejecución.

## Backend (app.py)

Para utilizar los módulos en el archivo `app.py`, que contiene las rutas y la conexión con la base de datos, sigue estos pasos:

1. Instala Python en tu sistema si aún no lo tienes instalado.

2. Instala las dependencias del proyecto utilizando pip. Puedes instalar las dependencias requeridas ejecutando el siguiente comando en la terminal:

```bash
pip install Flask Flask-Cors mysqlclient
```

3. Abre el archivo `app.py` y verifica que la configuración de conexión a la base de datos sea correcta, incluyendo el nombre de usuario, contraseña, host y nombre de la base de datos.
   
4. Ejecuta el archivo `app.py` utilizando Python para iniciar el servidor Flask. Puedes hacerlo ejecutando el siguiente comando en la terminal:

```bash
python app.py
```

El servidor Flask se iniciará y estará listo para manejar las solicitudes HTTP.

## Frontend (React)

Para utilizar el frontend React, sigue estos pasos:

1. Asegúrate de tener Node.js instalado en tu sistema. Puedes descargarlo desde [el sitio web oficial de Node.js](https://nodejs.org/).

2. Abre una terminal y navega hasta el directorio del proyecto.

3. Instala las dependencias del frontend ejecutando el siguiente comando en la terminal:

```bash
npm install
```

4. Una vez instaladas las dependencias, puedes iniciar la aplicación React ejecutando el siguiente comando en la terminal:
```bash
npm start
```

Esto iniciará el servidor de desarrollo de React y abrirá la aplicación en tu navegador web.