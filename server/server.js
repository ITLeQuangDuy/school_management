import express from "express";
// import cors from "cors";
import pool, { connectDB } from "./config/database.js";
import {register, login} from "./controllers/authController.js"

const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.post("/register", register);
app.post("/login", login);

app.listen(PORT, async () => {
  console.log("Server running on", PORT);
  const [rows] = await pool.query("select * from users");
//   console.log(rows);
});