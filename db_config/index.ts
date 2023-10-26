import dotenv from 'dotenv';
dotenv.config();

const config = {
    db: {
      url: `${process.env.DEV_DB_HOST}:${process.env.DEV_DB_PORT}`,
      name: `${process.env.DEV_DB_DATABASE}`
    }
  }
  
  export default config