import client from "../db/client.js";
import type { Request, Response } from "express";

// CREATE
export const createCell = async (req: Request, res: Response) => {
  const { image_url, user_id } = req.body;

  if (!image_url || !user_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const insertResult = await client.query(
      `INSERT INTO cells (image_url, user_id)
       VALUES ($1, $2)
       RETURNING *`,
      [image_url, user_id]
    );

    const cell = insertResult.rows[0];

    const userResult = await client.query(
      `SELECT username FROM users WHERE id = $1`,
      [cell.user_id]
    );

    const username = userResult.rows[0]?.username || null;

    res.status(201).json({ ...cell, username });
  } catch (error) {
    console.error("Error creating cell:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// READ
export const getCell = async (_req: Request, res: Response) => {
  try {
    const result = await client.query(
      `SELECT c.*, u.username
       FROM cells c
       LEFT JOIN users u ON c.user_id = u.id
       ORDER BY c.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cells:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
