import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client
  .connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("Connection error:", err));

export default client;
