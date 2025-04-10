import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db';

type SessionAttributes = {
  id: string; // UUID
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  expiresInMs: number; // n분 후 만료 이런식으로 조작할 수 있게 number로 설정
};

type SessionCreationAttributes = Optional<
  SessionAttributes,
  'createdAt' | 'updatedAt'
>;

class Session extends Model<SessionAttributes, SessionCreationAttributes> {
  declare id: string;
  declare userId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare expiresInMs: number;
}

Session.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiresInMs: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Session',
    timestamps: true,
  },
);

export { Session };
export type { SessionAttributes };
