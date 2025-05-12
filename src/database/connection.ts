import { Pool } from "pg";

const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

export const pool = new Pool({
  host: PGHOST,
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Configuração SSL
  },
});