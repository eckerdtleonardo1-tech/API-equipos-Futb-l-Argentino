import { Router } from 'express';
import {
  obtenerPartidos,
  obtenerPartidoPorId
} from '../controlador/partido.controlador.js';

const router = Router();

// Rutas de consulta de partidos (solo lectura)
router.get('/', obtenerPartidos);        // Listar partidos oficiales programados (?torneo_id=1)
router.get('/:id', obtenerPartidoPorId); // Detalle de un partido por ID

export default router;
