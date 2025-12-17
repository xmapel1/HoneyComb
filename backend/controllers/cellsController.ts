import client from "../db/client.js";
import type { Request, Response } from "express";

// CREATE
export const createCell = async (req: Request, res: Response) => {
  const { image_url, user_id, tags } = req.body;

  if (!image_url || !user_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const insertResult = await client.query(
      `INSERT INTO cells (image_url, user_id, tags)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [image_url, user_id, tags]
    );

    const cell = insertResult.rows[0];

    const userResult = await client.query(
      `SELECT username FROM beekeepers WHERE id = $1`,
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
      `SELECT c.*
       FROM cells c
       ORDER BY c.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cells:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE
export const updateCell = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { image_url, tags } = req.body;
  try {
    const result = await client.query(
      `UPDATE cells
       SET image_url = $1, tags = $2
       WHERE id = $3
       RETURNING *`,
      [image_url, tags, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cell not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating cell:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE
export const deleteCell = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      `DELETE FROM cells
        WHERE id = $1
        RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cell not found" });
    }
    res.json({ message: "Cell deleted successfully" });
  } catch (error) {
    console.error("Error deleting cell:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
