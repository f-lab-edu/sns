import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db';

type UUID = string;

type SessionAttributes = {
  id: UUID;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  expiresInMs: number; // n분 후 만료 이런식으로 조작할 수 있게 number로 설정
};

type SessionCreationAttributes = Optional<
  SessionAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

class Session extends Model<SessionAttributes, SessionCreationAttributes> {
  declare id: UUID;
  declare userId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare expiresInMs: number;
}

Session.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
