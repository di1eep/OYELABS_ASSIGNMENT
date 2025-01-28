import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./database/db.js";

import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
import AdminTable from "./data/AdminTable.js";
import AuthRouter from "./Authuntication/authroutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/auth", AuthRouter);

app.use(errorHandling);

// thiz  function ctrate table
createUserTable();
AdminTable();

app.get("/", async (req, res) => {
  console.log("Start");
  const result = await pool.query("SELECT current_database()");
  console.log("result", result.rows);
  res.send(`The database name is : ${result.rows[0].current_database}`);
});

app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});
