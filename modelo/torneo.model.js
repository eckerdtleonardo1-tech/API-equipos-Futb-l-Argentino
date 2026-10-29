import { DataTypes } from 'sequelize';
import sequelize from '../src/db.js';

const Torneo = sequelize.define('Torneo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true
  },
  campeon_ultima_edicion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  es_activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'torneos',
  timestamps: false
});

export default Torneo;
