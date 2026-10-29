import { Router } from 'express';
import { 
  obtenerClubes, 
  obtenerClubPorId, 
  obtenerProximosPartidos,
  obtenerCompetenciasClub,
  crearClub,
  actualizarClub,
  eliminarClub
} from '../controlador/club.controlador.js';
import { validarClub, validarActualizacionClub } from '../utils/validaciones.js';

const router = Router();

// Consultas
router.get('/', obtenerClubes);                           // Listado de los 30 clubes (?zona=A|B, ?buscar=nombre)
router.get('/:id', obtenerClubPorId);                     // Ficha completa de un club por ID
router.get('/:id/proximos-partidos', obtenerProximosPartidos); // Próximos partidos en cada competencia
router.get('/:id/competencias', obtenerCompetenciasClub); // Competencias activas y posición

// Operaciones CRUD
router.post('/', validarClub, crearClub);                 // Crear / agregar un nuevo club
router.put('/:id', validarActualizacionClub, actualizarClub); // Editar / modificar un club existente
router.delete('/:id', eliminarClub);                      // Eliminar un club

export default router;
