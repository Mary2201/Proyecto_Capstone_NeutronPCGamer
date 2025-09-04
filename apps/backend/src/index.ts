import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 3306),
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
});

type HealthRow = RowDataPacket & { ok: number };

app.get("/health", async (_req, res) => {
  try {
    // OJO: usa el generic para que rows sea HealthRow[]
    const [rows] = await pool.query<HealthRow[]>("SELECT 1 AS ok");

    const row = rows[0]; // ahora sí compila
    res.status(200).json({ status: "ok", db: row });
  } catch (e) {
    res.status(500).json({ status: "error", error: (e as Error).message });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`API running on :${port}`));