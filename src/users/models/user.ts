import { sequelize } from '../../config/db';
import { DataTypes, Model, Optional } from 'sequelize';

type UserAttributes = {
  uuid: string;
  email: string;
  hashedPw: string;
  username: string;
  discriminator: string;
  slug: string;
  id: string;
  name: string;
  role: 'REGULAR' | 'PREMIUM'; // enum
  createdAt: Date;
  updatedAt: Date;
};

type UserCreationAttributes = Optional<
  UserAttributes,
  'createdAt' | 'updatedAt' | 'uuid' | 'slug'
>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string;
  declare name: string;
  declare username: string;
  declare email: string;
  declare hashedPw: string;
  declare discriminator: string;
  declare slug: string;
  declare role: 'REGULAR' | 'PREMIUM';
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    hashedPw: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        len: [3, 8],
        is: /^[가-힣a-zA-Z0-9]+$/, // 한글, 알파벳, 숫자만
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    discriminator: {
      type: DataTypes.STRING(4),
      allowNull: false,
      validate: {
        is: /^[1-9][0-9]{3}$/, // 1000-9999
      },
    },
    slug: {
      type: DataTypes.STRING(20), // username (3-8) + discriminator (4)
      allowNull: false,
      unique: true,
      validate: {
        is: /^[가-힣a-z0-9]{3,8}[0-9]{4}$/, // 한글/소문자/숫자
      },
    },
    role: {
      type: DataTypes.ENUM('REGULAR', 'PREMIUM'),
      allowNull: false,
      defaultValue: 'REGULAR',
    },
    id: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['username', 'discriminator'],
      },
      {
        unique: true,
        fields: ['slug'],
      },
    ],
    hooks: {
      beforeCreate: async (user) => {
        // slug 생성: username + discriminator (유니코드 정규화)
        user.slug =
          `${user.username.toLowerCase()}${user.discriminator}`.normalize(
            'NFC',
          );
      },
      beforeUpdate: (user, options) => {
        // slug 변경 방지
        if (user.changed('slug')) {
          throw new Error('Slug cannot be updated');
        }
      },
    },
  },
);

export { User };
export type { UserCreationAttributes, UserAttributes };
