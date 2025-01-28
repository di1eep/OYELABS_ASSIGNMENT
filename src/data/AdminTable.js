import pool from "../database/db.js";

const AdminTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS Admin (
    id SERIAL PRIMARY KEY,
    Adminname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP NULL,
    updatedAt TIMESTAMP NULL
)
    `;

  try {
    pool.query(queryText);
    console.log("Admin table created if not exists");
  } catch (error) {
    console.log("Error creating Admin table : ", error);
  }
};

export default AdminTable;
