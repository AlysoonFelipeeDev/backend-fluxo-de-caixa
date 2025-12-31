import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // <--- Isso é o que permite o servidor falar com o banco
  }
});

export default pool;