import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fluxo_caixa_tio",
  password: "080216",
  port: 5432,
});

export default pool;
