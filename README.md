# PetCare-Server #

Código del servidor utilizando Node.js.

## Build ##

- Asegurate de instalar [Node.js](https://nodejs.org/es/) en tú máquina
- Asegurate de instalar [Docker](https://docs.docker.com/install/) en tu máquina
- Clona este repositorio o descargalo
- Corre `npm install` en el root del directorio para instalar las dependencias
- Corre `npm run build` en el root del directorio para construir el proyecto en una carpeta `dist`

## Uso ##

- Corre `npm start` en el root del directorio para empezar a correr el servidor. Una vez hecho esto el servidor correra en el puerto `3001`
- Obtener listado de mascotas de un usario: Haz una petición HTTP POST con el correo del usuario. Ejemplo en curl: `curl -d '{ "owner": "email@example.com }"' -H "Content-Type: application/json" -X POST http:localhost:3001`
- Obtener datos de una mascota en un rango de tiempo: Haz una petición HTTP POST con el correo del usuario, el nombre de la mascota, el timestamp de inicio (opcional), y el timestamp de final (opcional), ejemplo de petición usando curl: `curl -d '{ "owner": "email@example.com", "pet": "petname", "beginDate": 1581205607884, "endDate": 1581378407884 }' -H "Content-Type: application/json" -X POST http:localhost:3001`
