import Torneo from '../modelo/torneo.model.js';
import Partido from '../modelo/partido.model.js';
import Club from '../modelo/club.model.js';

/**
 * Obtener todos los torneos activos
 */
export const obtenerTorneos = async (req, res, next) => {
  try {
    const torneos = await Torneo.findAll({ order: [['anio', 'DESC']] });
    res.json({
      total: torneos.length,
      fecha_actualizacion: '16/10/2026',
      torneos
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener un torneo por ID
 */
export const obtenerTorneoPorId = async (req, res, next) => {
  try {
    const torneo = await Torneo.findByPk(req.params.id);
    if (!torneo) return res.status(404).json({ mensaje: 'Torneo no encontrado' });
    res.json(torneo);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener la tabla de posiciones oficial (Zona A y Zona B) de la Liga Profesional 2026
 * Soporta filtro opcional: ?zona=A | ?zona=B
 */
export const obtenerPosiciones = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { zona } = req.query;

    const torneo = await Torneo.findByPk(id || 1);
    if (!torneo) {
      return res.status(404).json({ mensaje: 'Torneo no encontrado' });
    }

    const whereClubes = {};
    if (zona) {
      whereClubes.zona_clausura = zona.toUpperCase();
    }

    const clubes = await Club.findAll({
      where: whereClubes,
      attributes: ['id', 'nombre', 'escudo_url', 'ciudad', 'estadio', 'zona_clausura', 'posicion_liga']
    });

    // Separar y ordenar por zona
    const formatoTabla = (lista) => {
      return lista
        .map(c => {
          const pos = c.posicion_liga || {};
          return {
            posicion: pos.posicion || 0,
            club: {
              id: c.id,
              nombre: c.nombre,
              escudo_url: (c.escudo_url && c.escudo_url.startsWith('/'))
                ? `${req.protocol}://${req.get('host') || 'localhost:3000'}${c.escudo_url}`
                : c.escudo_url,
              estadio: c.estadio,
              ciudad: c.ciudad
            },
            puntos: pos.puntos || 0,
            partidos_jugados: pos.partidos_jugados || 0,
            ganados: pos.ganados || 0,
            empatados: pos.empatados || 0,
            perdidos: pos.perdidos || 0,
            goles_favor: pos.goles_favor || 0,
            goles_contra: pos.goles_contra || 0,
            diferencia_goles: pos.diferencia_goles || 0,
            clasificacion: (pos.posicion <= 8) ? 'Octavos de Final (Playoffs)' : 'Fase Regular'
          };
        })
        .sort((a, b) => a.posicion - b.posicion);
    };

    const clubesZonaA = clubes.filter(c => c.zona_clausura === 'A');
    const clubesZonaB = clubes.filter(c => c.zona_clausura === 'B');

    const respuesta = {
      torneo: torneo.nombre,
      temporada: torneo.anio,
      estado: torneo.estado,
      formato: '2 zonas de 15 equipos. Los 8 primeros de cada zona clasifican a octavos de final.',
      fecha_actualizacion: '16/10/2026 (Fecha 13 en disputa)'
    };

    if (zona) {
      const z = zona.toUpperCase();
      respuesta[`zona_${z}`] = formatoTabla(z === 'A' ? clubesZonaA : clubesZonaB);
    } else {
      respuesta.zona_a = formatoTabla(clubesZonaA);
      respuesta.zona_b = formatoTabla(clubesZonaB);
    }

    res.json(respuesta);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener partidos de un torneo
 */
export const obtenerPartidosDeTorneo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const torneo = await Torneo.findByPk(id);
    if (!torneo) return res.status(404).json({ mensaje: 'Torneo no encontrado' });

    const partidos = await Partido.findAll({
      where: { torneo_id: parseInt(id, 10) },
      include: [
        { model: Club, as: 'Local', attributes: ['id', 'nombre', 'escudo_url', 'ciudad', 'estadio'] },
        { model: Club, as: 'Visitante', attributes: ['id', 'nombre', 'escudo_url', 'ciudad', 'estadio'] }
      ],
      order: [['fecha_hora', 'ASC']]
    });

    res.json({
      torneo: torneo.nombre,
      total_partidos: partidos.length,
      partidos
    });
  } catch (error) {
    next(error);
  }
};
