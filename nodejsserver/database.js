async function connect() {
  if (global.connection) return global.connection.connect();

  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: "postgres://postgres:123456@postgresdb:5432/aula-docker",
  });

  const client = await pool.connect();
  console.log("Criou pool de conexões no PostgreSQL!");

  const res = await client.query("SELECT NOW()");
  console.log(res.rows[0]);
  client.release();

  global.connection = pool;
  return pool.connect();
}

module.exports = {
  connect,
};
