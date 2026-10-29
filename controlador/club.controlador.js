import Club from '../modelo/club.model.js';
import Partido from '../modelo/partido.model.js';
import Torneo from '../modelo/torneo.model.js';
import { Op } from 'sequelize';

/**
 * Helper para asegurar que la URL del escudo sea accesible directamente
 */
const formatearClub = (club, req) => {
  if (!club) return club;
  const json = typeof club.toJSON === 'function' ? club.toJSON() : { ...club };
  if (json.escudo_url && json.escudo_url.startsWith('/')) {
    const host = req.get('host') || 'localhost:3000';
    json.escudo_url = `${req.protocol}://${host}${json.escudo_url}`;
  }
  return json;
};

/**
 * Obtener todos los clubes de la Liga Profesional Argentina
 * Soporta filtros opcionales: ?zona=A | ?zona=B | ?buscar=nombre
 */
export const obtenerClubes = async (req, res, next) => {
  try {
    const { zona, buscar } = req.query;
    const where = {};

    if (zona) {
      where.zona_clausura = zona.toUpperCase();
    }

    if (buscar) {
      where.nombre = { [Op.like]: `%${buscar}%` };
    }

    const clubes = await Club.findAll({
      where,
      order: [['nombre', 'ASC']]
    });

    res.json({
      total: clubes.length,
      fecha_actualizacion: '16/10/2026',
      clubes: clubes.map(c => formatearClub(c, req))
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener información detallada de un club por ID
 */
export const obtenerClubPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const club = await Club.findByPk(id);

    if (!club) {
      return res.status(404).json({ mensaje: 'Club no encontrado' });
    }

    res.json(formatearClub(club, req));
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener próximos partidos de un club en cada competencia activa
 */
export const obtenerProximosPartidos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clubId = parseInt(id, 10);

    const club = await Club.findByPk(clubId);
    if (!club) {
      return res.status(404).json({ mensaje: 'Club no encontrado' });
    }

    // Partidos desde la tabla de partidos
    const partidosDb = await Partido.findAll({
      where: {
        [Op.or]: [{ local_id: clubId }, { visitante_id: clubId }],
        estado: 'PROGRAMADO'
      },
      include: [
        { model: Club, as: 'Local', attributes: ['id', 'nombre', 'escudo_url', 'estadio'] },
        { model: Club, as: 'Visitante', attributes: ['id', 'nombre', 'escudo_url', 'estadio'] },
        { model: Torneo, attributes: ['id', 'nombre'] }
      ],
      order: [['fecha_hora', 'ASC']]
    });

    const fixtureFormateado = partidosDb.map(p => {
      const esLocal = p.local_id === clubId;
      const rival = esLocal ? p.Visitante : p.Local;

      return {
        id_partido: p.id,
        competencia: p.Torneo ? p.Torneo.nombre : 'Liga Profesional',
        fecha_hora: p.fecha_hora,
        estadio: p.estadio,
        condicion: esLocal ? 'Local' : 'Visitante',
        rival: rival
      };
    });

    res.json({
      club: club.nombre,
      escudo_url: club.escudo_url,
      director_tecnico: club.director_tecnico,
      competencias_activas: club.competencias_activas,
      proximos_partidos_detallados: club.proximos_partidos || [],
      partidos_programados_calendario: fixtureFormateado
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener competencias activas y posición del club
 */
export const obtenerCompetenciasClub = async (req, res, next) => {
  try {
    const { id } = req.params;
    const club = await Club.findByPk(id);

    if (!club) {
      return res.status(404).json({ mensaje: 'Club no encontrado' });
    }

    res.json({
      club: club.nombre,
      escudo_url: club.escudo_url,
      director_tecnico: club.director_tecnico,
      competencias_activas: club.competencias_activas,
      posicion_liga_profesional: club.posicion_liga,
      estado_copa_argentina: club.estado_copa_argentina,
      estado_copa_libertadores: club.estado_copa_libertadores,
      estado_copa_sudamericana: club.estado_copa_sudamericana,
      proximos_partidos_por_competencia: club.proximos_partidos
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Crear un nuevo club (CRUD - Crear)
 */
export const crearClub = async (req, res, next) => {
  try {
    const clubExistente = await Club.findOne({ where: { nombre: req.body.nombre } });
    if (clubExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un club registrado con ese nombre.' });
    }

    const nuevoClub = await Club.create(req.body);
    res.status(201).json({
      mensaje: 'Club creado exitosamente',
      club: formatearClub(nuevoClub, req)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar/editar un club existente (CRUD - Editar)
 */
export const actualizarClub = async (req, res, next) => {
  try {
    const { id } = req.params;
    const club = await Club.findByPk(id);

    if (!club) {
      return res.status(404).json({ mensaje: 'Club no encontrado' });
    }

    // Si intenta cambiar el nombre por otro que ya existe
    if (req.body.nombre && req.body.nombre !== club.nombre) {
      const clubExistente = await Club.findOne({ where: { nombre: req.body.nombre } });
      if (clubExistente) {
        return res.status(400).json({ mensaje: 'Ya existe otro club con ese nombre.' });
      }
    }

    await club.update(req.body);
    res.json({
      mensaje: 'Club actualizado exitosamente',
      club: formatearClub(club, req)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar un club existente (CRUD - Eliminar)
 */
export const eliminarClub = async (req, res, next) => {
  try {
    const { id } = req.params;
    const club = await Club.findByPk(id);

    if (!club) {
      return res.status(404).json({ mensaje: 'Club no encontrado' });
    }

    const nombreEliminado = club.nombre;
    await club.destroy();

    res.json({
      mensaje: `Club ${nombreEliminado} eliminado exitosamente`
    });
  } catch (error) {
    next(error);
  }
};
