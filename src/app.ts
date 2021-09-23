import express from "express";
import morgan from "morgan";
import config from "./config";
import cors from "cors";
import motherboardsRoutes from "./routes/motherboards/motherboards.routes";
import cpusRoutes from "./routes/cpus/cpus.routes";
import songRoutes from "./routes/song/song.routes";

var clientURI = {
  origin: ["http://192.168.0.148:3000", "http://localhost:3000"],
};
const app = express();
app.set("port", config.PORT);
app.use(morgan("dev"));
app.use(cors(clientURI));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(motherboardsRoutes);
app.use(cpusRoutes);
app.use(songRoutes);

export default app;
