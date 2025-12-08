import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import cellsRoutes from "./routes/cellsRoutes.js";
// import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// routes
app.use("/api/cells", cellsRoutes);
// app.use("/api/honeycomb", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
