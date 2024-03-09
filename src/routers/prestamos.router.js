import { Router } from "express";
import { listarPrestamo, registrarPrestamos, eliminarPrestamos, actualizarPrestamos, consultarPrestamos } from "../controllers/prestamos.controller.js";


const router = Router();

router.get('/listar', listarPrestamo);
router.post('/registrar', registrarPrestamos);
router.delete('/eliminar/:id', eliminarPrestamos);
router.put('/actualizar/:id', actualizarPrestamos);
router.get('/consultar/:id', consultarPrestamos);

export default router;
