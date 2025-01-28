import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../database/db.js";
import express from "express";

const AuthRouter = express.Router();

AuthRouter.post("/signup", async (req, res, next) => {
  const { adminname, email, password } = req.body;

  if (!adminname || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const checkEmail = await pool.query(
      "SELECT 1 FROM admin WHERE email = $1",
      [email]
    );

    if (checkEmail.rows.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }
    const result = await pool.query(
      "INSERT INTO admin (adminname, email, password, createdat) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [adminname, email, hashedPassword]
    );

    const newAdmin = result.rows[0];

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      user: newAdmin,
    });
  } catch (err) {
    console.error("Error during signup:", err);
    next(err);
  }
});

AuthRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }
  try {
    const result = await pool.query("SELECT * FROM admin WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: admin.id, adminname: admin.adminname, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    next(err);
  }
});

export default AuthRouter;
