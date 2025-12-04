import {sequelize } from '../database/database.js';
import { DataTypes } from 'sequelize';

export const Proyecto = sequelize.define('Proyecto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  estado :{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['en proceso', 'finalizado', 'definido', 'bloqueo']]
    }
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'proyectos',
  timestamps: false
});
