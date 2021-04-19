import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const EMAIL_CONFIG = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER, // generated ethereal user
    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
};
export const JWT_HASH = process.env.JWT_HASH;
export const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";

export const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
export const MYSQL_USER = process.env.MYSQL_USER;
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export const MYSQL_HOST = process.env.MYSQL_HOST;
export const MYSQL_PORT = process.env.MYSQL_PORT;

export default {
  PORT,
  EMAIL_CONFIG,
  JWT_HASH,
  FRONTEND_URL,
  MYSQL_PASSWORD,
  MYSQL_USER,
  MYSQL_DATABASE,
  MYSQL_PORT,
  MYSQL_HOST,
};
