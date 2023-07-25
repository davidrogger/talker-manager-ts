import mysql from 'mysql2/promise';
import 'dotenv/config';

const connection = mysql.createPool({
  host: process.env.DB_HOSTNAME,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

export default connection;
