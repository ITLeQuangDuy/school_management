import express from "express";
// import cors from "cors";
import pool, { connectDB } from "./config/database.js";

const app = express();

//const PORT = process.env.PORT
const PORT = 3000;

connectDB();

app.listen(PORT, async () => {
  console.log("Server running on", PORT);
  const [rows] = await pool.query("select * from users");
  console.log(rows);
});
