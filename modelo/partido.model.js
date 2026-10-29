import { DataTypes } from 'sequelize';
import sequelize from '../src/db.js';
import Club from './club.model.js';
import Torneo from './torneo.model.js';

const Partido = sequelize.define('Partido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estadio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  goles_local: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  goles_visitante: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'PROGRAMADO'
  }
}, {
  tableName: 'partidos',
  timestamps: false
});

// Relaciones
Torneo.hasMany(Partido, { foreignKey: 'torneo_id' });
Partido.belongsTo(Torneo, { foreignKey: 'torneo_id' });

Club.hasMany(Partido, { as: 'PartidosLocal', foreignKey: 'local_id' });
Partido.belongsTo(Club, { as: 'Local', foreignKey: 'local_id' });

Club.hasMany(Partido, { as: 'PartidosVisitante', foreignKey: 'visitante_id' });
Partido.belongsTo(Club, { as: 'Visitante', foreignKey: 'visitante_id' });

export default Partido;
