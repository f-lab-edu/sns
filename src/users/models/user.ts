import { sequelize } from '../../config/db';
import { DataTypes } from 'sequelize';

type UserColumns = {
  id: string;
  name: string;
};

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export {User};
export type { UserColumns };