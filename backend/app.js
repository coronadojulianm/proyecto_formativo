import express from 'express';
import usuarioRouter from './src/routers/usuarios.router.js';
import bodyParser from "body-parser";

import cors from 'cors'

// Importacion de rutas
import novedad from './src/routers/novedades.router.js';
import elemento from "./src/routers/elementos.router.js";
import ambientes from "./src/routers/ambientes.router.js";
import area from "./src/routers/areas.router.js";
import prestamos from './src/routers/prestamos.router.js';

// documentacion
import fs from 'fs'

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

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
app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(express.static('./src/public'));

app.get('/documents',(req, res) => {
    res.render('documentacion.ejs');
});




app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});