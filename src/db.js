import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

// Se houver uma DATABASE_URL (no Render), usamos ela. 
// Caso contrário, usamos as configurações locais.
const isProduction = process.env.DATABASE_URL;

const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false, // Obrigatório para bancos de dados gerenciados como o do Render
        },
      }
    : {
        user: "postgres",
        host: "localhost",
        database: "fluxo_caixa_tio",
        password: "080216",
        port: 5432,
      }
);

export default pool;