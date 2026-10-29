import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './futbol.sqlite',
  logging: false
});

export default sequelize;
