import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/db.js';
import clubRoutes from './routes/club.route.js';
import torneoRoutes from './routes/torneo.route.js';
import partidoRoutes from './routes/partido.route.js';
import authRoutes from './routes/auth.route.js';
import { obtenerPosiciones } from './controlador/torneo.controlador.js';
import { manejadorErrores } from './utils/error.middleware.js';

// Cargar modelos para que Sequelize reconozca las relaciones
import './modelo/club.model.js';
import './modelo/torneo.model.js';
import './modelo/partido.model.js';

import path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos (escudos oficiales de los clubes)
app.use('/escudos', express.static(path.resolve('public', 'escudos')));

// ─────────────────────────────────────────
// Rutas de la API (Solo Consulta)
// ─────────────────────────────────────────
app.use('/auth', authRoutes);
app.use('/clubes', clubRoutes);
app.use('/torneos', torneoRoutes);
app.use('/partidos', partidoRoutes);
app.get('/posiciones', obtenerPosiciones); // Acceso directo a la tabla oficial de la Liga Profesional 2026

// Ruta raíz informativa
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Futbol Argentino - Liga Profesional 2026',
    fecha_datos: '16/10/2026',
    total_equipos: 30,
    endpoints: {
      clubes: '/clubes',
      club_detalle: '/clubes/:id',
      club_proximos_partidos: '/clubes/:id/proximos-partidos',
      club_competencias: '/clubes/:id/competencias',
      posiciones_liga: '/posiciones',
      torneos: '/torneos',
      torneo_detalle: '/torneos/:id',
      torneo_posiciones: '/torneos/:id/posiciones',
      torneo_partidos: '/torneos/:id/partidos',
      partidos_programados: '/partidos',
      escudos: '/escudos/:archivo (ej: /escudos/boca-juniors.svg)'
    },
    documentacion: 'Ver README.md para la documentacion completa de la API'
  });
});

// Manejo centralizado de errores
app.use(manejadorErrores);

const PORT = process.env.PORT || 3000;

// Sincronizar Base de Datos e Iniciar Servidor
sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
