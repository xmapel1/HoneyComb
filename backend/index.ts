import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import cellsRoutes from "./routes/cellsRoutes";
import beekeepersRoutes from "./routes/beekeepersRoutes";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// routes
app.use("/api/cells", cellsRoutes);
app.use("/api/beekeepers", beekeepersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
