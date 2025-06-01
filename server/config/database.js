import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

//database config
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool(dbConfig);

export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connect DB successfull >>>");
    connection.release();
  } catch (error) {
    console.error("Database connect error!", error);
    process.exit(1);
  }
};

export default pool;