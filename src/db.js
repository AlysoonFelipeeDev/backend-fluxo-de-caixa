import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

// Verifica se estamos no Render (produção) ou no PC (desenvolvimento)
const isProduction = process.env.NODE_ENV === "production" || process.env.DATABASE_URL?.includes("render.com");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Se for produção (Render), usa SSL. Se for local, não usa nada.
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  
  // Caso a DATABASE_URL não exista (uso local padrão)
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "fluxo_caixa_tio",
  password: process.env.DB_PASSWORD || "080216",
  port: process.env.DB_PORT || 5432,
});

export default pool;