import type { Request, Response } from "express";
import client from "../db/client.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET!;
// const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";

// CREATE
export const createBeekeeper = async (req: Request, res: Response) => {
  console.log("req.body:", req.body);
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(
      `INSERT INTO beekeepers (username, password, email)
             VALUES ($1, $2, $3)
             RETURNING *`,
      [username, hashedPassword, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("insertion error:", err);
    res.status(500).json({ error: "internal Server Error" });
  }
};

// READ
export const getBeekeepers = async (req: Request, res: Response) => {
  try {
    const result = await client.query(`
            SELECT * FROM beekeepers ORDER BY id ASC
        `);
    res.json(result.rows);
  } catch (err) {
    console.error("fetching error:", err);
    res.status(500).json({ error: "internal Server Error" });
  }
};

// READ by ID
export const getBeekeepersById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      `SELECT * FROM beekeepers WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("fetching error:", err);
    res.status(500).json({ error: "internal Server Error" });
  }
};

// UPDATE
export const updateBeekeepers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  if (!username && !password && !email) {
    return res.status(400).json({ error: "No fields updated" });
  }

  try {
    let updatedPassword = password;

    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const result = await client.query(
      `UPDATE beekeepers
             SET username = $1,
                 password = $2,
                 email = $3
             WHERE id = $4
             RETURNING *`,
      [username, updatedPassword, email, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("update error:", err);
    res.status(500).json({ error: "internal Server Error" });
  }
};

// DELETE
export const deleteBeekeepers = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      `DELETE FROM beekeepers WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json({
      message: "user deleted successfully",
      deletedUser: result.rows[0],
    });
  } catch (err) {
    console.error("deletion error:", err);
    res.status(500).json({ error: "internal Server Error" });
  }
};
