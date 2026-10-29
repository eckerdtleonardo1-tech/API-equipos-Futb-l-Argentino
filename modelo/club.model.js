import { DataTypes } from 'sequelize';
import sequelize from '../src/db.js';

const Club = sequelize.define('Club', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  anio_fundacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estadio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  presidente: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  director_tecnico: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  cantidad_socios: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  escudo_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  equipaciones: {
    type: DataTypes.JSON, // { titular, suplente, alternativa }
    allowNull: true,
    defaultValue: {}
  },
  sponsors: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  trofeos: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  zona_clausura: {
    type: DataTypes.STRING, // 'A' o 'B'
    allowNull: true,
    defaultValue: null
  },
  competencias_activas: {
    type: DataTypes.JSON, // Array de strings con las competencias en disputa
    allowNull: true,
    defaultValue: []
  },
  posicion_liga: {
    type: DataTypes.JSON, // { zona, posicion, puntos, partidos_jugados, ganados, empatados, perdidos, goles_favor, goles_contra, diferencia_goles }
    allowNull: true,
    defaultValue: null
  },
  estado_copa_libertadores: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  estado_copa_sudamericana: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  estado_copa_argentina: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  proximos_partidos: {
    type: DataTypes.JSON, // Lista de próximos partidos con rival, fecha, hora, torneo, estadio
    allowNull: true,
    defaultValue: []
  },
  nota: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'clubes',
  timestamps: false
});

export default Club;
