import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { RegionsController } from "./presentation/controllers/RegionsController";
import { WaterLevelsController } from "./presentation/controllers/WaterLevelsController";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const controller = new RegionsController();
const waterLevelsController = new WaterLevelsController();

app.get('/regions/all', (req, res) => controller.getRegions(req, res));
app.post("/water-levels", (req, res) => waterLevelsController.addWaterLevel(req, res));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
