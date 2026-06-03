const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
  host: process.env.POSTGRES_HOST || "postgres",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("API Node.js funcionando correctamente");
});

app.get("/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      mensaje: "Conexión exitosa a PostgreSQL",
      fecha: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error conectando a PostgreSQL",
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en puerto ${port}`);
});
