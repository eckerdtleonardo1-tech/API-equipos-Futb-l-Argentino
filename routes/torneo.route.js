import { Router } from 'express';
import {
  obtenerTorneos,
  obtenerTorneoPorId,
  obtenerPosiciones,
  obtenerPartidosDeTorneo
} from '../controlador/torneo.controlador.js';

const router = Router();

// Rutas de consulta de torneos
router.get('/', obtenerTorneos);                           // Listado de torneos activos
router.get('/:id', obtenerTorneoPorId);                     // Detalle de un torneo por ID
router.get('/:id/posiciones', obtenerPosiciones);           // Tablas de posiciones oficiales (?zona=A|B)
router.get('/:id/partidos', obtenerPartidosDeTorneo);       // Partidos programados del torneo

export default router;
