import * as dotenv from "dotenv";

dotenv.config();

export default {
  APP: process.env.APP || "dev",
  PORT: process.env.PORT || "3001",

  DB_DOCKER_HOST: process.env.DB_HOST || "postgres://postgres:admin@db:5432/",
  // DB_LOCALHOST_HOST: process.env.DB_HOST || "postgres://postgres:admin@localhost:5433/",


  SOCKET_IO_CONNECTION: process.env.SOCKET_IO_CONNECTION || 'connect',
  SOCKET_IO_DISCONNECTION: process.env.SOCKET_IO_DISCONNECTION || 'disconnect',
  SERVER_HORSE_HEART_RATE: process.env.SERVER_HORSE_HEART_RATE || 'Server/HorseHeartRate',
  CLIENT_HORSE_HEART_RATE: process.env.CLIENT_HORSE_HEART_RATE || 'Client/HorseHeartRate',
  POSTGRES_PASSWORD: 'admin'
}