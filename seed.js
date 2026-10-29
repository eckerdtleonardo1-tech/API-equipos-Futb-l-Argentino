import sequelize from './src/db.js';
import Club from './modelo/club.model.js';
import Torneo from './modelo/torneo.model.js';
import Partido from './modelo/partido.model.js';

// =============================================================
// SEED OFICIAL — Liga Profesional Argentina 2026
// Datos actualizados al 16 de octubre de 2026
// =============================================================

const seed = async () => {
  await sequelize.sync({ force: true });

  // ─────────────────────────────────────────────────────────
  // ZONA A — Clausura 2026 (Jornada 12 completada)
  // ─────────────────────────────────────────────────────────
  // Boca Juniors, San Lorenzo, Independiente, Talleres, Estudiantes LP,
  // Lanús, Vélez Sarsfield, Defensa y Justicia, Newell's Old Boys,
  // Unión, Central Córdoba SdE, Platense, Instituto, Deportivo Riestra,
  // Gimnasia y Esgrima de Mendoza

  // ─────────────────────────────────────────────────────────
  // ZONA B — Clausura 2026 (Jornada 12 completada)
  // ─────────────────────────────────────────────────────────
  // River Plate, Racing Club, Huracán, Argentinos Juniors,
  // Independiente Rivadavia, Atlético Tucumán, Gimnasia LP,
  // Belgrano, Rosario Central, Banfield, Tigre, Sarmiento,
  // Barracas Central, Aldosivi, Estudiantes de Río Cuarto

  const clubesData = [
    // ── ZONA A ──────────────────────────────────────────────
    {
      nombre: 'Boca Juniors',
      anio_fundacion: 1905,
      estadio: 'La Bombonera',
      ciudad: 'Buenos Aires',
      presidente: 'Juan Román Riquelme',
      director_tecnico: 'Rodolfo Arruabarrena',
      cantidad_socios: 314000,
      equipaciones: {
        titular: 'Camiseta azul con franja amarilla horizontal, pantalón azul',
        suplente: 'Camiseta amarilla, pantalón azul',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/boca-juniors.svg',
      sponsors: ['Betsson', 'DirecTV', 'Adidas'],
      trofeos: {
        liga_argentina: 34,
        copa_argentina: 6,
        supercopa_argentina: 2,
        copa_libertadores: 6,
        copa_sudamericana: 2,
        recopa_sudamericana: 4,
        copa_interamericana: 2,
        intercontinental: 2,
        total_internacionales: 16
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)', 'Copa Sudamericana 2026 (Semifinales)'],
      posicion_liga: {
        zona: 'A',
        posicion: 3,
        puntos: 21,
        partidos_jugados: 12,
        ganados: 5,
        empatados: 6,
        perdidos: 1,
        goles_favor: 19,
        goles_contra: 13,
        diferencia_goles: 6
      },
      estado_copa_sudamericana: 'Semifinales — ida perdida 0-1 vs Vasco da Gama. Vuelta pendiente.',
      estado_copa_argentina: 'Semifinales — vs Banfield (sábado 14 de noviembre, sede a confirmar)',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-16',
          hora: '21:30',
          condicion: 'Local',
          rival: 'Talleres (Córdoba)',
          estadio: 'La Bombonera, Buenos Aires'
        },
        {
          competencia: 'Copa Sudamericana 2026 — Semifinal Vuelta',
          fecha: 'Por confirmar (antes del 25/10)',
          hora: 'Por confirmar',
          condicion: 'Visitante',
          rival: 'Vasco da Gama',
          estadio: 'Estadio São Januário, Río de Janeiro (Brasil)'
        },
        {
          competencia: 'Copa Argentina 2026 — Semifinal',
          fecha: '2026-11-14',
          hora: 'Por confirmar',
          condicion: 'Por confirmar',
          rival: 'Banfield',
          estadio: 'Por confirmar'
        }
      ]
    },
    {
      nombre: 'San Lorenzo',
      anio_fundacion: 1908,
      estadio: 'Estadio Pedro Bidegain (El Nuevo Gasómetro)',
      ciudad: 'Buenos Aires',
      presidente: 'Marcelo Culotta',
      director_tecnico: 'Néstor Gorosito',
      cantidad_socios: 90000,
      equipaciones: {
        titular: 'Camiseta a franjas verticales azul y roja, pantalón negro',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/san-lorenzo.svg',
      sponsors: ['Codere', 'Umbro'],
      trofeos: {
        liga_argentina: 17,
        copa_argentina: 3,
        supercopa_argentina: 1,
        copa_libertadores: 1,
        copa_sudamericana: 1,
        recopa_sudamericana: 1,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 3
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)'],
      posicion_liga: {
        zona: 'A',
        posicion: 10,
        puntos: 14,
        partidos_jugados: 12,
        ganados: 4,
        empatados: 2,
        perdidos: 6,
        goles_favor: 5,
        goles_contra: 11,
        diferencia_goles: -6
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-18',
          hora: '18:00',
          condicion: 'Visitante',
          rival: 'Estudiantes de La Plata',
          estadio: 'Estadio UNO, La Plata'
        }
      ]
    },
    {
      nombre: 'Independiente',
      anio_fundacion: 1905,
      estadio: 'Estadio Libertadores de América — Ricardo Enrique Bochini',
      ciudad: 'Avellaneda',
      presidente: 'Néstor Grindetti',
      director_tecnico: 'Jadson Viera',
      cantidad_socios: 110000,
      equipaciones: {
        titular: 'Camiseta roja, pantalón rojo',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/independiente.svg',
      sponsors: ['Codere', 'Le Coq Sportif'],
      trofeos: {
        liga_argentina: 16,
        copa_argentina: 1,
        supercopa_argentina: 0,
        copa_libertadores: 7,
        copa_sudamericana: 1,
        recopa_sudamericana: 1,
        copa_interamericana: 2,
        intercontinental: 1,
        total_internacionales: 12
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)'],
      posicion_liga: {
        zona: 'A',
        posicion: 7,
        puntos: 18,
        partidos_jugados: 12,
        ganados: 5,
        empatados: 3,
        perdidos: 4,
        goles_favor: 11,
        goles_contra: 12,
        diferencia_goles: -1
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13 — Clásico de Avellaneda)',
          fecha: '2026-10-18',
          hora: '14:45',
          condicion: 'Visitante',
          rival: 'Racing Club',
          estadio: 'Estadio Presidente Perón, Avellaneda'
        }
      ]
    },
    {
      nombre: 'Talleres',
      anio_fundacion: 1913,
      estadio: 'Estadio Mario Alberto Kempes',
      ciudad: 'Córdoba',
      presidente: 'Andrés Fassi',
      director_tecnico: 'Omar De Felippe',
      cantidad_socios: 58000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales azul y blanca, pantalón azul',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/talleres.svg',
      sponsors: ['Kappa', 'BetWarrior'],
      trofeos: {
        liga_argentina: 1,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)'],
      posicion_liga: {
        zona: 'A',
        posicion: 15,
        puntos: 9,
        partidos_jugados: 12,
        ganados: 2,
        empatados: 3,
        perdidos: 7,
        goles_favor: 11,
        goles_contra: 18,
        diferencia_goles: -7
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-16',
          hora: '21:30',
          condicion: 'Visitante',
          rival: 'Boca Juniors',
          estadio: 'La Bombonera, Buenos Aires'
        }
      ]
    },
    {
      nombre: 'Estudiantes de La Plata',
      anio_fundacion: 1905,
      estadio: 'Estadio UNO — Jorge Luis Hirschi',
      ciudad: 'La Plata',
      presidente: 'Juan Sebastián Verón',
      director_tecnico: 'Alexander Medina',
      cantidad_socios: 55000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales roja y blanca, pantalón blanco',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta azul, pantalón azul'
      },
      escudo_url: '/escudos/estudiantes-lp.svg',
      sponsors: ['Patagonia', 'Le Coq Sportif'],
      trofeos: {
        liga_argentina: 10,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 4,
        copa_sudamericana: 0,
        recopa_sudamericana: 1,
        copa_interamericana: 1,
        intercontinental: 1,
        total_internacionales: 7
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)', 'Copa Libertadores 2026 (Semifinales)'],
      posicion_liga: {
        zona: 'A',
        posicion: 9,
        puntos: 14,
        partidos_jugados: 12,
        ganados: 4,
        empatados: 2,
        perdidos: 6,
        goles_favor: 15,
        goles_contra: 13,
        diferencia_goles: 2
      },
      estado_copa_libertadores: 'Semifinales — vs Flamengo (ida en Estadio UNO, vuelta en el Maracaná). Fechas por confirmar.',
      estado_copa_argentina: 'Eliminado en cuartos de final (perdió 0-1 vs Platense)',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-18',
          hora: '18:00',
          condicion: 'Local',
          rival: 'San Lorenzo',
          estadio: 'Estadio UNO, La Plata'
        },
        {
          competencia: 'Copa Libertadores 2026 — Semifinal',
          fecha: 'Por confirmar (octubre/noviembre 2026)',
          hora: 'Por confirmar',
          condicion: 'Local (ida)',
          rival: 'Flamengo',
          estadio: 'Estadio UNO, La Plata'
        }
      ]
    },
    {
      nombre: 'Lanús',
      anio_fundacion: 1915,
      estadio: 'Estadio Ciudad de Lanús — Néstor Díaz Pérez (La Fortaleza)',
      ciudad: 'Lanús',
      presidente: 'Nicolás Russo',
      director_tecnico: 'Mauricio Pellegrino',
      cantidad_socios: 43000,
      equipaciones: {
        titular: 'Camiseta roja, pantalón rojo',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/lanus.svg',
      sponsors: ['Le Coq Sportif', 'Codere'],
      trofeos: {
        liga_argentina: 2,
        copa_argentina: 3,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 2,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 2
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)'],
      posicion_liga: {
        zona: 'A',
        posicion: 5,
        puntos: 20,
        partidos_jugados: 12,
        ganados: 6,
        empatados: 2,
        perdidos: 4,
        goles_favor: 15,
        goles_contra: 9,
        diferencia_goles: 6
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-17',
          hora: '17:30',
          condicion: 'Visitante',
          rival: 'Platense',
          estadio: 'Estadio Ciudad de Vicente López, Vicente López'
        }
      ]
    },
    {
      nombre: 'Vélez Sársfield',
      anio_fundacion: 1910,
      estadio: 'Estadio José Amalfitani',
      ciudad: 'Buenos Aires',
      presidente: 'Fabián Berlanga',
      director_tecnico: 'Guillermo Barros Schelotto',
      cantidad_socios: 78000,
      equipaciones: {
        titular: 'Camiseta blanca con franja azul vertical, pantalón azul',
        suplente: 'Camiseta azul, pantalón azul',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/velez-sarsfield.svg',
      sponsors: ['Umbro', 'BetWarrior'],
      trofeos: {
        liga_argentina: 11,
        copa_argentina: 2,
        supercopa_argentina: 0,
        copa_libertadores: 1,
        copa_sudamericana: 1,
        recopa_sudamericana: 1,
        copa_interamericana: 2,
        intercontinental: 1,
        total_internacionales: 6
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)'],
      posicion_liga: {
        zona: 'A',
        posicion: 4,
        puntos: 21,
        partidos_jugados: 12,
        ganados: 5,
        empatados: 6,
        perdidos: 1,
        goles_favor: 17,
        goles_contra: 13,
        diferencia_goles: 4
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-17',
          hora: '20:00',
          condicion: 'Local',
          rival: 'Gimnasia y Esgrima (Mendoza)',
          estadio: 'Estadio José Amalfitani, Buenos Aires'
        }
      ]
    },
    {
      nombre: 'Defensa y Justicia',
      anio_fundacion: 1935,
      estadio: 'Estadio Norberto Tito Tomaghello',
      ciudad: 'Florencio Varela',
      presidente: 'Diego Lemme',
      director_tecnico: 'Julio Vaccari',
      cantidad_socios: 20000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales verde y amarilla, pantalón verde',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/defensa-y-justicia.svg',
      sponsors: ['Umbro', 'Codere'],
      trofeos: {
        liga_argentina: 2,
        copa_argentina: 1,
        supercopa_argentina: 1,
        copa_libertadores: 0,
        copa_sudamericana: 1,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 1
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)'],
      posicion_liga: {
        zona: 'A',
        posicion: 2,
        puntos: 24,
        partidos_jugados: 12,
        ganados: 7,
        empatados: 3,
        perdidos: 2,
        goles_favor: 18,
        goles_contra: 11,
        diferencia_goles: 7
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-16',
          hora: '19:00',
          condicion: 'Local',
          rival: 'Instituto',
          estadio: 'Estadio Norberto Tito Tomaghello, Florencio Varela'
        }
      ]
    },
    {
      nombre: "Newell's Old Boys",
      anio_fundacion: 1903,
      estadio: 'Estadio Marcelo Bielsa (El Coloso del Parque)',
      ciudad: 'Rosario',
      presidente: 'Ignacio Boero',
      director_tecnico: 'Frank Darío Kudelka',
      cantidad_socios: 65000,
      equipaciones: {
        titular: 'Camiseta a mitades horizontales roja (arriba) y negra (abajo), pantalón negro',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/newells-old-boys.svg',
      sponsors: ['Adidas', 'BetWarrior'],
      trofeos: {
        liga_argentina: 6,
        copa_argentina: 3,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)'],
      posicion_liga: {
        zona: 'A',
        posicion: 8,
        puntos: 17,
        partidos_jugados: 12,
        ganados: 4,
        empatados: 5,
        perdidos: 3,
        goles_favor: 11,
        goles_contra: 9,
        diferencia_goles: 2
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-19',
          hora: '19:00',
          condicion: 'Local',
          rival: 'Central Córdoba (Santiago del Estero)',
          estadio: 'Estadio Marcelo Bielsa, Rosario'
        }
      ]
    },
    {
      nombre: 'Unión',
      anio_fundacion: 1907,
      estadio: 'Estadio 15 de Abril',
      ciudad: 'Santa Fe',
      presidente: 'Luis Spahn',
      director_tecnico: 'Leonardo Madelón',
      cantidad_socios: 32000,
      equipaciones: {
        titular: 'Camiseta roja, pantalón azul',
        suplente: 'Camiseta azul, pantalón azul',
        alternativa: 'Camiseta blanca, pantalón blanco'
      },
      escudo_url: '/escudos/union-santa-fe.svg',
      sponsors: ['Puma', 'Codere'],
      trofeos: {
        liga_argentina: 0,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)'],
      posicion_liga: {
        zona: 'A',
        posicion: 11,
        puntos: 13,
        partidos_jugados: 12,
        ganados: 4,
        empatados: 1,
        perdidos: 7,
        goles_favor: 17,
        goles_contra: 21,
        diferencia_goles: -4
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-19',
          hora: '21:15',
          condicion: 'Visitante',
          rival: 'Deportivo Riestra',
          estadio: 'Estadio Guillermo Laza, Buenos Aires'
        }
      ]
    },
    {
      nombre: 'Central Córdoba (Santiago del Estero)',
      anio_fundacion: 1906,
      estadio: 'Estadio Madre de Ciudades',
      ciudad: 'Santiago del Estero',
      presidente: 'Hernán Zanni',
      director_tecnico: 'Sebastián Domínguez',
      cantidad_socios: 16000,
      equipaciones: {
        titular: 'Camiseta a mitades verticales negra (izq.) y roja (der.), pantalón negro',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta azul, pantalón azul'
      },
      escudo_url: '/escudos/central-cordoba.svg',
      sponsors: ['Umbro', 'Codere'],
      trofeos: {
        liga_argentina: 0,
        copa_argentina: 1,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)'],
      posicion_liga: {
        zona: 'A',
        posicion: 14,
        puntos: 10,
        partidos_jugados: 12,
        ganados: 2,
        empatados: 4,
        perdidos: 6,
        goles_favor: 10,
        goles_contra: 16,
        diferencia_goles: -6
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-19',
          hora: '19:00',
          condicion: 'Visitante',
          rival: "Newell's Old Boys",
          estadio: 'Estadio Marcelo Bielsa, Rosario'
        }
      ]
    },
    {
      nombre: 'Platense',
      anio_fundacion: 1905,
      estadio: 'Estadio Ciudad de Vicente López',
      ciudad: 'Vicente López',
      presidente: 'Gastón Arcieri',
      director_tecnico: 'Martín Palermo',
      cantidad_socios: 18000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales roja, blanca y negra (Calamar), pantalón negro',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta azul, pantalón azul'
      },
      escudo_url: '/escudos/platense.svg',
      sponsors: ['Puma', 'BetWarrior'],
      trofeos: {
        liga_argentina: 0,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)', 'Copa Argentina 2026 (Semifinales)'],
      posicion_liga: {
        zona: 'A',
        posicion: 13,
        puntos: 11,
        partidos_jugados: 12,
        ganados: 2,
        empatados: 5,
        perdidos: 5,
        goles_favor: 12,
        goles_contra: 18,
        diferencia_goles: -6
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Semifinales — vs Atlético Tucumán (miércoles 28 de octubre, 21:15, Estadio Padre Martearena, Salta)',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-17',
          hora: '17:30',
          condicion: 'Local',
          rival: 'Lanús',
          estadio: 'Estadio Ciudad de Vicente López, Vicente López'
        },
        {
          competencia: 'Copa Argentina 2026 — Semifinal',
          fecha: '2026-10-28',
          hora: '21:15',
          condicion: 'Por sorteo',
          rival: 'Atlético Tucumán',
          estadio: 'Estadio Padre Martearena, Salta'
        }
      ]
    },
    {
      nombre: 'Instituto',
      anio_fundacion: 1918,
      estadio: 'Estadio Monumental de Alta Córdoba',
      ciudad: 'Córdoba',
      presidente: 'Juan Manuel Cavagliatto',
      director_tecnico: 'Diego Flores',
      cantidad_socios: 30000,
      equipaciones: {
        titular: 'Camiseta a mitades horizontales roja (arriba) y negra (abajo), pantalón negro',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta verde, pantalón verde'
      },
      escudo_url: '/escudos/instituto.svg',
      sponsors: ['Puma', 'Sportium'],
      trofeos: {
        liga_argentina: 0,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)'],
      posicion_liga: {
        zona: 'A',
        posicion: 1,
        puntos: 26,
        partidos_jugados: 12,
        ganados: 8,
        empatados: 2,
        perdidos: 2,
        goles_favor: 19,
        goles_contra: 10,
        diferencia_goles: 9
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-16',
          hora: '19:00',
          condicion: 'Visitante',
          rival: 'Defensa y Justicia',
          estadio: 'Estadio Norberto Tito Tomaghello, Florencio Varela'
        }
      ]
    },
    {
      nombre: 'Deportivo Riestra',
      anio_fundacion: 1916,
      estadio: 'Estadio Guillermo Laza',
      ciudad: 'Buenos Aires',
      presidente: 'Fernando Salorio',
      director_tecnico: 'Guillermo Duró',
      cantidad_socios: 8000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales roja y negra, pantalón negro',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta azul, pantalón azul'
      },
      escudo_url: '/escudos/deportivo-riestra.svg',
      sponsors: ['Kappa', 'Betsson'],
      trofeos: {
        liga_argentina: 0,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)'],
      posicion_liga: {
        zona: 'A',
        posicion: 12,
        puntos: 11,
        partidos_jugados: 12,
        ganados: 2,
        empatados: 5,
        perdidos: 5,
        goles_favor: 9,
        goles_contra: 12,
        diferencia_goles: -3
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en cuartos de final (perdió por penales vs Banfield)',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-19',
          hora: '21:15',
          condicion: 'Local',
          rival: 'Unión',
          estadio: 'Estadio Guillermo Laza, Buenos Aires'
        }
      ]
    },
    {
      nombre: 'Gimnasia y Esgrima (Mendoza)',
      anio_fundacion: 1910,
      estadio: 'Estadio Víctor Antonio Legrotaglie',
      ciudad: 'Mendoza',
      presidente: 'Fernando Porretta',
      director_tecnico: 'Darío Franco',
      cantidad_socios: 12000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales verde y blanca, pantalón blanco',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta azul, pantalón azul'
      },
      escudo_url: '/escudos/gimnasia-mendoza.svg',
      sponsors: ['Kappa', 'Sportium'],
      trofeos: {
        liga_argentina: 0,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'A',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona A)'],
      posicion_liga: {
        zona: 'A',
        posicion: 6,
        puntos: 20,
        partidos_jugados: 12,
        ganados: 6,
        empatados: 2,
        perdidos: 4,
        goles_favor: 15,
        goles_contra: 12,
        diferencia_goles: 3
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-17',
          hora: '20:00',
          condicion: 'Visitante',
          rival: 'Vélez Sársfield',
          estadio: 'Estadio José Amalfitani, Buenos Aires'
        }
      ]
    },

    // ── ZONA B ──────────────────────────────────────────────
    {
      nombre: 'River Plate',
      anio_fundacion: 1901,
      estadio: 'Estadio Monumental Antonio Vespucio Liberti',
      ciudad: 'Buenos Aires',
      presidente: 'Stéfano Di Carlo',
      director_tecnico: 'Leonardo Ponzio',
      cantidad_socios: 335000,
      equipaciones: {
        titular: 'Camiseta blanca con banda roja diagonal, pantalón blanco',
        suplente: 'Camiseta roja, pantalón rojo',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/river-plate.svg',
      sponsors: ['Codere', 'DirecTV', 'Adidas'],
      trofeos: {
        liga_argentina: 37,
        copa_argentina: 4,
        supercopa_argentina: 2,
        copa_libertadores: 4,
        copa_sudamericana: 1,
        recopa_sudamericana: 4,
        copa_interamericana: 1,
        intercontinental: 1,
        total_internacionales: 11
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 7,
        puntos: 17,
        partidos_jugados: 12,
        ganados: 5,
        empatados: 2,
        perdidos: 5,
        goles_favor: 15,
        goles_contra: 13,
        diferencia_goles: 2
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-18',
          hora: '20:15',
          condicion: 'Visitante',
          rival: 'Belgrano',
          estadio: 'Estadio Julio César Villagra, Córdoba'
        }
      ]
    },
    {
      nombre: 'Racing Club',
      anio_fundacion: 1903,
      estadio: 'Estadio Presidente Perón (El Cilindro)',
      ciudad: 'Avellaneda',
      presidente: 'Diego Milito',
      director_tecnico: 'Sebastián Romero',
      cantidad_socios: 83000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales celeste y blanca, pantalón azul',
        suplente: 'Camiseta azul, pantalón azul',
        alternativa: 'Camiseta roja, pantalón rojo'
      },
      escudo_url: '/escudos/racing-club.svg',
      sponsors: ['RCA', 'Aeroset', 'Le Coq Sportif'],
      trofeos: {
        liga_argentina: 18,
        copa_argentina: 0,
        supercopa_argentina: 1,
        copa_libertadores: 1,
        copa_sudamericana: 1,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 1,
        total_internacionales: 3
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 9,
        puntos: 15,
        partidos_jugados: 12,
        ganados: 4,
        empatados: 3,
        perdidos: 5,
        goles_favor: 12,
        goles_contra: 13,
        diferencia_goles: -1
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en cuartos de final (perdió 2-3 vs Boca Juniors)',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13 — Clásico de Avellaneda)',
          fecha: '2026-10-18',
          hora: '14:45',
          condicion: 'Local',
          rival: 'Independiente',
          estadio: 'Estadio Presidente Perón, Avellaneda'
        }
      ]
    },
    {
      nombre: 'Huracán',
      anio_fundacion: 1908,
      estadio: 'Estadio Tomás Adolfo Ducó (El Palacio)',
      ciudad: 'Buenos Aires',
      presidente: 'Abel Poza',
      director_tecnico: 'Diego Martínez',
      cantidad_socios: 52000,
      equipaciones: {
        titular: 'Camiseta a mitades horizontales blanca (arriba) y roja (abajo), pantalón azul',
        suplente: 'Camiseta azul, pantalón azul',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/huracan.svg',
      sponsors: ['Kappa', 'Betsson'],
      trofeos: {
        liga_argentina: 4,
        copa_argentina: 1,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 6,
        puntos: 19,
        partidos_jugados: 13,
        ganados: 5,
        empatados: 4,
        perdidos: 4,
        goles_favor: 12,
        goles_contra: 12,
        diferencia_goles: 0
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 14)',
          fecha: '2026-10-24',
          hora: '17:30',
          condicion: 'Visitante',
          rival: 'Argentinos Juniors',
          estadio: 'Estadio Diego Armando Maradona, Buenos Aires'
        }
      ]
    },
    {
      nombre: 'Argentinos Juniors',
      anio_fundacion: 1904,
      estadio: 'Estadio Diego Armando Maradona',
      ciudad: 'Buenos Aires',
      presidente: 'Cristian Malaspina',
      director_tecnico: 'Nicolás Diez',
      cantidad_socios: 38000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales roja y blanca, pantalón blanco',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta azul, pantalón azul'
      },
      escudo_url: '/escudos/argentinos-juniors.svg',
      sponsors: ['Puma', 'BetWarrior'],
      trofeos: {
        liga_argentina: 4,
        copa_argentina: 1,
        supercopa_argentina: 0,
        copa_libertadores: 1,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 1
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 3,
        puntos: 22,
        partidos_jugados: 12,
        ganados: 6,
        empatados: 4,
        perdidos: 2,
        goles_favor: 16,
        goles_contra: 11,
        diferencia_goles: 5
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-17',
          hora: '15:00',
          condicion: 'Visitante',
          rival: 'Banfield',
          estadio: 'Estadio Florencio Sola, Banfield'
        }
      ]
    },
    {
      nombre: 'Independiente Rivadavia',
      anio_fundacion: 1905,
      estadio: 'Estadio Bautista Gargantini',
      ciudad: 'Mendoza',
      presidente: 'Daniel Vila',
      director_tecnico: 'Alfredo Berti',
      cantidad_socios: 22000,
      equipaciones: {
        titular: 'Camiseta celeste, pantalón azul',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/independiente-rivadavia.svg',
      sponsors: ['Kappa', 'Codere'],
      trofeos: {
        liga_argentina: 2,
        copa_argentina: 1,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 8,
        puntos: 18,
        partidos_jugados: 12,
        ganados: 5,
        empatados: 3,
        perdidos: 4,
        goles_favor: 14,
        goles_contra: 13,
        diferencia_goles: 1
      },
      estado_copa_libertadores: 'Eliminado en octavos de final (perdió por penales vs Fluminense)',
      estado_copa_argentina: 'Eliminado en cuartos de final (perdió por penales vs Atlético Tucumán)',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-17',
          hora: '17:30',
          condicion: 'Local',
          rival: 'Tigre',
          estadio: 'Estadio Bautista Gargantini, Mendoza'
        }
      ]
    },
    {
      nombre: 'Atlético Tucumán',
      anio_fundacion: 1902,
      estadio: 'Estadio Monumental José Fierro',
      ciudad: 'Tucumán',
      presidente: 'Mario Leito',
      director_tecnico: 'Julio César Falcioni',
      cantidad_socios: 35000,
      equipaciones: {
        titular: 'Camiseta a mitades verticales azul (izq.) y blanca (der.), pantalón azul',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta roja, pantalón rojo'
      },
      escudo_url: '/escudos/atletico-tucuman.svg',
      sponsors: ['Kappa', 'BetWarrior'],
      trofeos: {
        liga_argentina: 0,
        copa_argentina: 1,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)', 'Copa Argentina 2026 (Semifinales)'],
      posicion_liga: {
        zona: 'B',
        posicion: 10,
        puntos: 14,
        partidos_jugados: 12,
        ganados: 3,
        empatados: 5,
        perdidos: 4,
        goles_favor: 12,
        goles_contra: 14,
        diferencia_goles: -2
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Semifinales — vs Platense (miércoles 28 de octubre, 21:15, Estadio Padre Martearena, Salta)',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-17',
          hora: '20:00',
          condicion: 'Local',
          rival: 'Rosario Central',
          estadio: 'Estadio Monumental José Fierro, Tucumán'
        },
        {
          competencia: 'Copa Argentina 2026 — Semifinal',
          fecha: '2026-10-28',
          hora: '21:15',
          condicion: 'Por sorteo',
          rival: 'Platense',
          estadio: 'Estadio Padre Martearena, Salta'
        }
      ]
    },
    {
      nombre: 'Gimnasia y Esgrima La Plata',
      anio_fundacion: 1887,
      estadio: 'Estadio Juan Carlos Zerillo (El Bosque)',
      ciudad: 'La Plata',
      presidente: 'Mariano Cowen',
      director_tecnico: 'Ariel Pereyra',
      cantidad_socios: 48000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales azul y blanca, pantalón azul',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta roja, pantalón rojo'
      },
      escudo_url: '/escudos/gimnasia-lp.svg',
      sponsors: ['Kappa', 'Farmacity'],
      trofeos: {
        liga_argentina: 1,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 4,
        puntos: 22,
        partidos_jugados: 13,
        ganados: 6,
        empatados: 4,
        perdidos: 3,
        goles_favor: 19,
        goles_contra: 18,
        diferencia_goles: 1
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 14)',
          fecha: '2026-10-25',
          hora: '15:00',
          condicion: 'Local',
          rival: 'Banfield',
          estadio: 'Estadio Juan Carlos Zerillo, La Plata'
        }
      ]
    },
    {
      nombre: 'Belgrano',
      anio_fundacion: 1905,
      estadio: 'Estadio Julio César Villagra',
      ciudad: 'Córdoba',
      presidente: 'Luis Fabián Artime',
      director_tecnico: 'Ricardo Zielinski',
      cantidad_socios: 66000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales azul y blanca, pantalón azul',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta roja, pantalón rojo'
      },
      escudo_url: '/escudos/belgrano.svg',
      sponsors: ['Umbro', 'Betsson'],
      trofeos: {
        liga_argentina: 1,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 2,
        puntos: 22,
        partidos_jugados: 12,
        ganados: 6,
        empatados: 4,
        perdidos: 2,
        goles_favor: 14,
        goles_contra: 7,
        diferencia_goles: 7
      },
      nota: 'Campeón del Torneo Apertura 2026 (venció a River Plate 3-2 en la final)',
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-18',
          hora: '20:15',
          condicion: 'Local',
          rival: 'River Plate',
          estadio: 'Estadio Julio César Villagra, Córdoba'
        }
      ]
    },
    {
      nombre: 'Rosario Central',
      anio_fundacion: 1889,
      estadio: 'Estadio Gigante de Arroyito',
      ciudad: 'Rosario',
      presidente: 'Gonzalo Belloso',
      director_tecnico: 'Jorge Almirón',
      cantidad_socios: 73000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales azul y amarilla, pantalón azul',
        suplente: 'Camiseta celeste, pantalón celeste',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/rosario-central.svg',
      sponsors: ['Le Coq Sportif', 'Codere'],
      trofeos: {
        liga_argentina: 8,
        copa_argentina: 1,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 1,
        puntos: 22,
        partidos_jugados: 12,
        ganados: 6,
        empatados: 4,
        perdidos: 2,
        goles_favor: 17,
        goles_contra: 9,
        diferencia_goles: 8
      },
      estado_copa_libertadores: 'Eliminado en octavos de final (perdió vs Corinthians)',
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-17',
          hora: '20:00',
          condicion: 'Visitante',
          rival: 'Atlético Tucumán',
          estadio: 'Estadio Monumental José Fierro, Tucumán'
        }
      ]
    },
    {
      nombre: 'Banfield',
      anio_fundacion: 1896,
      estadio: 'Estadio Florencio Sola',
      ciudad: 'Banfield',
      presidente: 'Matías Mariotto',
      director_tecnico: 'Pedro Troglio',
      cantidad_socios: 35000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales verde y blanca, pantalón blanco',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/banfield.svg',
      sponsors: ['Kappa', 'BetWarrior'],
      trofeos: {
        liga_argentina: 2,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)', 'Copa Argentina 2026 (Semifinales)'],
      posicion_liga: {
        zona: 'B',
        posicion: 11,
        puntos: 13,
        partidos_jugados: 12,
        ganados: 3,
        empatados: 4,
        perdidos: 5,
        goles_favor: 10,
        goles_contra: 13,
        diferencia_goles: -3
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Semifinales — vs Boca Juniors (sábado 14 de noviembre, sede a confirmar)',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-17',
          hora: '15:00',
          condicion: 'Local',
          rival: 'Argentinos Juniors',
          estadio: 'Estadio Florencio Sola, Banfield'
        },
        {
          competencia: 'Copa Argentina 2026 — Semifinal',
          fecha: '2026-11-14',
          hora: 'Por confirmar',
          condicion: 'Por confirmar',
          rival: 'Boca Juniors',
          estadio: 'Por confirmar'
        }
      ]
    },
    {
      nombre: 'Tigre',
      anio_fundacion: 1902,
      estadio: 'Estadio José Dellagiovanna (El Matador)',
      ciudad: 'Victoria',
      presidente: 'Martín Suárez',
      director_tecnico: 'Diego Dabove',
      cantidad_socios: 28000,
      equipaciones: {
        titular: 'Camiseta a franjas verticales roja y azul, pantalón azul',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/tigre.svg',
      sponsors: ['Umbro', 'Codere'],
      trofeos: {
        liga_argentina: 1,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 1,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 1
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 12,
        puntos: 12,
        partidos_jugados: 12,
        ganados: 3,
        empatados: 3,
        perdidos: 6,
        goles_favor: 10,
        goles_contra: 16,
        diferencia_goles: -6
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-17',
          hora: '17:30',
          condicion: 'Visitante',
          rival: 'Independiente Rivadavia',
          estadio: 'Estadio Bautista Gargantini, Mendoza'
        }
      ]
    },
    {
      nombre: 'Sarmiento (Junín)',
      anio_fundacion: 1911,
      estadio: 'Estadio Eva Perón',
      ciudad: 'Junín',
      presidente: 'Fernando Chiófalo',
      director_tecnico: 'Facundo Sava',
      cantidad_socios: 14000,
      equipaciones: {
        titular: 'Camiseta verde, pantalón verde',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta azul, pantalón azul'
      },
      escudo_url: '/escudos/sarmiento.svg',
      sponsors: ['Kappa', 'Betsson'],
      trofeos: {
        liga_argentina: 0,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 5,
        puntos: 20,
        partidos_jugados: 12,
        ganados: 6,
        empatados: 2,
        perdidos: 4,
        goles_favor: 21,
        goles_contra: 18,
        diferencia_goles: 3
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-19',
          hora: '19:00',
          condicion: 'Local',
          rival: 'Barracas Central',
          estadio: 'Estadio Eva Perón, Junín'
        }
      ]
    },
    {
      nombre: 'Barracas Central',
      anio_fundacion: 1904,
      estadio: 'Estadio Claudio Chiqui Tapia',
      ciudad: 'Buenos Aires',
      presidente: 'Matías Tapia',
      director_tecnico: 'Damián Ayude',
      cantidad_socios: 12000,
      equipaciones: {
        titular: 'Camiseta a franjas verticales roja y blanca, pantalón negro',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta negra, pantalón negro'
      },
      escudo_url: '/escudos/barracas-central.svg',
      sponsors: ['Puma', 'BetWarrior'],
      trofeos: {
        liga_argentina: 0,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 8,
        puntos: 18,
        partidos_jugados: 12,
        ganados: 5,
        empatados: 3,
        perdidos: 4,
        goles_favor: 14,
        goles_contra: 14,
        diferencia_goles: 0
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-19',
          hora: '19:00',
          condicion: 'Visitante',
          rival: 'Sarmiento (Junín)',
          estadio: 'Estadio Eva Perón, Junín'
        }
      ]
    },
    {
      nombre: 'Aldosivi',
      anio_fundacion: 1913,
      estadio: 'Estadio José María Minella',
      ciudad: 'Mar del Plata',
      presidente: 'Hernán Tillous',
      director_tecnico: 'Javier Sanguinetti',
      cantidad_socios: 18000,
      equipaciones: {
        titular: 'Camiseta verde, pantalón verde',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta azul, pantalón azul'
      },
      escudo_url: '/escudos/aldosivi.svg',
      sponsors: ['Kappa', 'Sportium'],
      trofeos: {
        liga_argentina: 0,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 14,
        puntos: 10,
        partidos_jugados: 12,
        ganados: 2,
        empatados: 4,
        perdidos: 6,
        goles_favor: 9,
        goles_contra: 17,
        diferencia_goles: -8
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-18',
          hora: '18:00',
          condicion: 'Local',
          rival: 'Estudiantes de Río Cuarto',
          estadio: 'Estadio José María Minella, Mar del Plata'
        }
      ]
    },
    {
      nombre: 'Estudiantes de Río Cuarto',
      anio_fundacion: 1926,
      estadio: 'Estadio Ciudad de Río Cuarto (Juan Gilberto Funes)',
      ciudad: 'Río Cuarto',
      presidente: 'Luis Amor',
      director_tecnico: 'Rubén Darío Forestello',
      cantidad_socios: 9000,
      equipaciones: {
        titular: 'Camiseta a rayas verticales negra y blanca, pantalón negro',
        suplente: 'Camiseta blanca, pantalón blanco',
        alternativa: 'Camiseta roja, pantalón rojo'
      },
      escudo_url: '/escudos/estudiantes-rio-cuarto.svg',
      sponsors: ['Puma', 'Betsson'],
      trofeos: {
        liga_argentina: 0,
        copa_argentina: 0,
        supercopa_argentina: 0,
        copa_libertadores: 0,
        copa_sudamericana: 0,
        recopa_sudamericana: 0,
        copa_interamericana: 0,
        intercontinental: 0,
        total_internacionales: 0
      },
      zona_clausura: 'B',
      competencias_activas: ['Liga Profesional — Clausura 2026 (Zona B)'],
      posicion_liga: {
        zona: 'B',
        posicion: 15,
        puntos: 8,
        partidos_jugados: 12,
        ganados: 1,
        empatados: 5,
        perdidos: 6,
        goles_favor: 8,
        goles_contra: 18,
        diferencia_goles: -10
      },
      estado_copa_sudamericana: null,
      estado_copa_argentina: 'Eliminado en fases previas',
      proximos_partidos: [
        {
          competencia: 'Liga Profesional — Clausura 2026 (Jornada 13)',
          fecha: '2026-10-18',
          hora: '18:00',
          condicion: 'Visitante',
          rival: 'Aldosivi',
          estadio: 'Estadio José María Minella, Mar del Plata'
        }
      ]
    }
  ];

  // Crear todos los clubes
  const clubes = await Club.bulkCreate(clubesData);

  // ─────────────────────────────────────────────────────────
  // TORNEOS ACTIVOS
  // ─────────────────────────────────────────────────────────
  const torneos = await Torneo.bulkCreate([
    {
      nombre: 'Liga Profesional — Torneo Clausura 2026',
      anio: 2026,
      descripcion: 'Segundo torneo de la temporada 2026. Fase regular: 16 jornadas en dos zonas de 15 equipos. Los 8 primeros de cada zona clasifican a playoffs (octavos de final) por el título.',
      estado: 'En curso (Fecha 13 en disputa)',
      campeon_ultima_edicion: 'Belgrano (Torneo Apertura 2026 — venció a River Plate 3-2 en la final; en 2025 Rosario Central ganó la Liga Anual, Platense el Apertura 2025 y Estudiantes LP el Clausura 2025; en 2024 Vélez Sarsfield ganó la Liga Betano y Estudiantes LP la Copa de la Liga)',
      es_activo: true
    },
    {
      nombre: 'Copa Argentina 2026',
      anio: 2026,
      descripcion: 'Copa de eliminación directa abierta a todos los clubes del fútbol argentino. En semifinales quedan: Atlético Tucumán vs Platense (28/10) y Banfield vs Boca Juniors (14/11).',
      estado: 'Semifinales',
      campeon_ultima_edicion: 'Independiente Rivadavia (Copa Argentina 2025 — venció a Argentinos Juniors 5-3 por penales tras 2-2; en 2024 el campeón fue Central Córdoba de Santiago del Estero tras vencer 1-0 a Vélez Sarsfield)',
      es_activo: true
    },
    {
      nombre: 'Copa Libertadores 2026',
      anio: 2026,
      descripcion: 'Máxima competencia continental de clubes de Sudamérica (CONMEBOL). Argentina mantiene un representante en semifinales: Estudiantes de La Plata vs Flamengo.',
      estado: 'Semifinales',
      campeon_ultima_edicion: 'Flamengo (Copa Libertadores 2025 — venció 1-0 a Palmeiras en la final; en 2024 el campeón fue Botafogo tras vencer 3-1 a Atlético Mineiro)',
      es_activo: true
    },
    {
      nombre: 'Copa Sudamericana 2026',
      anio: 2026,
      descripcion: 'Segunda competencia continental de CONMEBOL. Argentina tiene a Boca Juniors en semifinales vs Vasco da Gama (ida 0-1, vuelta pendiente).',
      estado: 'Semifinales',
      campeon_ultima_edicion: 'Lanús (Copa Sudamericana 2025 — venció 5-4 por penales a Atlético Mineiro tras 0-0; en 2024 el campeón fue Racing Club tras vencer 3-1 a Cruzeiro)',
      es_activo: true
    }
  ]);

  // ─────────────────────────────────────────────────────────
  // PARTIDOS OFICIALES — Fecha 13 y Semifinales de Copas
  // ─────────────────────────────────────────────────────────
  const torneoLiga = torneos[0];
  const torneoCopaArg = torneos[1];

  // Helper para buscar club por nombre
  const clubId = (nombre) => {
    const c = clubes.find(item => item.nombre.toLowerCase().includes(nombre.toLowerCase()));
    return c ? c.id : null;
  };

  await Partido.bulkCreate([
    // Jueves 15 de octubre 2026 (Finalizado)
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Huracán'),
      visitante_id: clubId('Gimnasia y Esgrima La Plata'),
      fecha_hora: new Date('2026-10-15T20:00:00-03:00'),
      estadio: 'Estadio Tomás Adolfo Ducó (Buenos Aires)',
      goles_local: 1,
      goles_visitante: 2,
      estado: 'FINALIZADO'
    },
    // Viernes 16 de octubre 2026
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Defensa y Justicia'),
      visitante_id: clubId('Instituto'),
      fecha_hora: new Date('2026-10-16T19:00:00-03:00'),
      estadio: 'Estadio Norberto Tito Tomaghello (Florencio Varela)',
      estado: 'PROGRAMADO'
    },
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Boca Juniors'),
      visitante_id: clubId('Talleres'),
      fecha_hora: new Date('2026-10-16T21:30:00-03:00'),
      estadio: 'La Bombonera (Buenos Aires)',
      estado: 'PROGRAMADO'
    },
    // Sábado 17 de octubre 2026
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Banfield'),
      visitante_id: clubId('Argentinos Juniors'),
      fecha_hora: new Date('2026-10-17T15:00:00-03:00'),
      estadio: 'Estadio Florencio Sola (Banfield)',
      estado: 'PROGRAMADO'
    },
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Platense'),
      visitante_id: clubId('Lanús'),
      fecha_hora: new Date('2026-10-17T17:30:00-03:00'),
      estadio: 'Estadio Ciudad de Vicente López (Vicente López)',
      estado: 'PROGRAMADO'
    },
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Independiente Rivadavia'),
      visitante_id: clubId('Tigre'),
      fecha_hora: new Date('2026-10-17T17:30:00-03:00'),
      estadio: 'Estadio Bautista Gargantini (Mendoza)',
      estado: 'PROGRAMADO'
    },
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Vélez Sársfield'),
      visitante_id: clubId('Gimnasia y Esgrima (Mendoza)'),
      fecha_hora: new Date('2026-10-17T20:00:00-03:00'),
      estadio: 'Estadio José Amalfitani (Buenos Aires)',
      estado: 'PROGRAMADO'
    },
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Atlético Tucumán'),
      visitante_id: clubId('Rosario Central'),
      fecha_hora: new Date('2026-10-17T20:00:00-03:00'),
      estadio: 'Estadio Monumental José Fierro (Tucumán)',
      estado: 'PROGRAMADO'
    },
    // Domingo 18 de octubre 2026
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Racing Club'),
      visitante_id: clubId('Independiente'),
      fecha_hora: new Date('2026-10-18T14:45:00-03:00'),
      estadio: 'Estadio Presidente Perón (Avellaneda)',
      estado: 'PROGRAMADO'
    },
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Estudiantes de La Plata'),
      visitante_id: clubId('San Lorenzo'),
      fecha_hora: new Date('2026-10-18T18:00:00-03:00'),
      estadio: 'Estadio UNO (La Plata)',
      estado: 'PROGRAMADO'
    },
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Aldosivi'),
      visitante_id: clubId('Estudiantes de Río Cuarto'),
      fecha_hora: new Date('2026-10-18T18:00:00-03:00'),
      estadio: 'Estadio José María Minella (Mar del Plata)',
      estado: 'PROGRAMADO'
    },
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Belgrano'),
      visitante_id: clubId('River Plate'),
      fecha_hora: new Date('2026-10-18T20:15:00-03:00'),
      estadio: 'Estadio Julio César Villagra (Córdoba)',
      estado: 'PROGRAMADO'
    },
    // Lunes 19 de octubre 2026
    {
      torneo_id: torneoLiga.id,
      local_id: clubId("Newell's Old Boys"),
      visitante_id: clubId('Central Córdoba (Santiago del Estero)'),
      fecha_hora: new Date('2026-10-19T19:00:00-03:00'),
      estadio: 'Estadio Marcelo Bielsa (Rosario)',
      estado: 'PROGRAMADO'
    },
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Sarmiento (Junín)'),
      visitante_id: clubId('Barracas Central'),
      fecha_hora: new Date('2026-10-19T19:00:00-03:00'),
      estadio: 'Estadio Eva Perón (Junín)',
      estado: 'PROGRAMADO'
    },
    {
      torneo_id: torneoLiga.id,
      local_id: clubId('Deportivo Riestra'),
      visitante_id: clubId('Unión'),
      fecha_hora: new Date('2026-10-19T21:15:00-03:00'),
      estadio: 'Estadio Guillermo Laza (Buenos Aires)',
      estado: 'PROGRAMADO'
    },
    // Semifinales Copa Argentina 2026
    {
      torneo_id: torneoCopaArg.id,
      local_id: clubId('Atlético Tucumán'),
      visitante_id: clubId('Platense'),
      fecha_hora: new Date('2026-10-28T21:15:00-03:00'),
      estadio: 'Estadio Padre Martearena (Salta)',
      estado: 'PROGRAMADO'
    },
    {
      torneo_id: torneoCopaArg.id,
      local_id: clubId('Banfield'),
      visitante_id: clubId('Boca Juniors'),
      fecha_hora: new Date('2026-11-14T20:00:00-03:00'),
      estadio: 'Sede neutral a confirmar',
      estado: 'PROGRAMADO'
    }
  ]);

  console.log(`Seed completado con exito: ${clubes.length} clubes, ${torneos.length} torneos y 17 partidos oficiales cargados al 16/10/2026.`);
  process.exit(0);
};

seed().catch(err => {
  console.error('Error en seed:', err);
  process.exit(1);
});
