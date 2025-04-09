import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

// 테스트용이라 매번 DB 새로 생성
async function syncDB() {
  try {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
    // await sequelize.sync({ alter: true });
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

export { sequelize, connectDB, syncDB };
