import pool from "../database/db.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (checkUser.rows.length > 0) {
      return res.status(400).json({
        error: "User with this email already exists.",
      });
    }
    const result = await pool.query(
      "INSERT INTO users (name, email, createdat) VALUES ($1, $2, NOW()) RETURNING *",
      [name, email]
    );
    const newUser = result.rows[0];
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};


export const getAllUsers = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    const users = result.rows;
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM users where id = $1", [
      req.params.id,
    ]);
    const user = result.rows[0];
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name=$1, email=$2, updatedAt = NOW() WHERE id=$3 RETURNING *",
      [name, email, req.params.id]
    );
    const updatedUser = result.rows[0];
    if (!updatedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    const deletedUser = result.rows[0];
    if (!deletedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (err) {
    next(err);
  }
};
