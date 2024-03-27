

const express = require('express'); 
const cors = require('cors')
const { dbConnection } = require('./database/config');

require('dotenv').config();


// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio público
app.use( express.static('public') ) // middleware --> función que se ejecuta cuando alguien hace una petición al servidor. 'public' es el nombre de la carpeta

// Lectura y parseo del body
app.use(express.json()) // las pteciones que vengan en json las proceso aqui y voy a extraer su contenido.

// Rutas
app.use('/api/auth', require('./routes/auth')) //Lo que exporta el archivo de routes/auth lo ejecuta api/auth (localhost:4000/api/auth + las rutas de endpoints.. api/auth/new por ejemplo)
app.use('/api/events', require('./routes/events')) 
// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`  )
} )