import Partido from '../modelo/partido.model.js';
import Club from '../modelo/club.model.js';
import Torneo from '../modelo/torneo.model.js';

/**
 * Obtener todos los partidos oficiales programados
 * Soporta filtros opcionales: ?torneo_id=1
 */
export const obtenerPartidos = async (req, res, next) => {
  try {
    const { torneo_id } = req.query;
    const where = {};
    if (torneo_id) where.torneo_id = parseInt(torneo_id, 10);

    const partidos = await Partido.findAll({
      where,
      include: [
        { model: Club, as: 'Local', attributes: ['id', 'nombre', 'escudo_url', 'ciudad', 'estadio'] },
        { model: Club, as: 'Visitante', attributes: ['id', 'nombre', 'escudo_url', 'ciudad', 'estadio'] },
        { model: Torneo, attributes: ['id', 'nombre', 'anio'] }
      ],
      order: [['fecha_hora', 'ASC']]
    });

    res.json({
      total: partidos.length,
      fecha_actualizacion: '16/10/2026',
      jornada: 'Fecha 13 del Torneo Clausura 2026 y Semifinales de Copas',
      partidos
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener un partido por ID
 */
export const obtenerPartidoPorId = async (req, res, next) => {
  try {
    const partido = await Partido.findByPk(req.params.id, {
      include: [
        { model: Club, as: 'Local', attributes: ['id', 'nombre', 'escudo_url', 'estadio', 'ciudad', 'presidente'] },
        { model: Club, as: 'Visitante', attributes: ['id', 'nombre', 'escudo_url', 'estadio', 'ciudad', 'presidente'] },
        { model: Torneo, attributes: ['id', 'nombre', 'anio'] }
      ]
    });

    if (!partido) return res.status(404).json({ mensaje: 'Partido no encontrado' });
    res.json(partido);
  } catch (error) {
    next(error);
  }
};
