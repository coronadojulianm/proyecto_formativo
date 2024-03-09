import express from 'express';
import usuarioRouter from './src/routers/usuarios.router.js';
import bodyParser from "body-parser";

// Importacion de rutas
import novedad from './src/routers/novedades.router.js';
import elemento from "./src/routers/elementos.router.js";
import ambientes from "./src/routers/ambientes.router.js";
import area from "./src/routers/areas.router.js";
import prestamos from './src/routers/prestamos.router.js';

// documentacion
import fs from 'fs'

const app = express();
const PORT = 3000;

app.use(express.json());
//configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//rutas
app.use('/novedad',novedad);
app.use(usuarioRouter);
app.use('/elemento', elemento);
app.use('/ambientes', ambientes);
app.use('/area', area);
app.use('/prestamos',prestamos);


// Documentancion
app.get('/documentacion', (req, res) => {
  try {
    // Lee el contenido del archivo EJS
    const ejsContent = fs.readFileSync('./doc/documentacion.ejs', 'utf-8');

    // Envía el contenido del archivo directamente como respuesta al cliente
    res.send(ejsContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar la solicitud');
  }
});




app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});