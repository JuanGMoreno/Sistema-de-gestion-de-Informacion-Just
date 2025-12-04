import app from './app.js';
import dotenv from 'dotenv';
import { sequelize } from './database/database.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
main();


async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


