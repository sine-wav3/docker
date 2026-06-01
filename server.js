const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
    host: "postgres",
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: 5432
});

app.get("/", (req, res) => {
    res.json({
        message: "API funcionando correctamente"
    });
});

app.get("/db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(3000, () => {
    console.log("Servidor Node.js ejecutándose");
});

app.get("usuarios", async (req, res) => {
  const resultado = await pool.query(
    "SELECT * FROM usuarios"
  );

  res.json(resultado.rows);
});

