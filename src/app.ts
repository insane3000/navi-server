import express from "express";
import morgan from "morgan";
import config from "./config";
import cors from "cors";
import motherboardsRoutes from "./routes/motherboards/motherboards.routes";
import cpusRoutes from "./routes/cpus/cpus.routes";
import songRoutes from "./routes/song/song.routes";
import bookRoutes from "./routes/book/book.routes";
import productsRoutes from "./routes/products/products.routes";
import cashRegisterRoutes from "./routes/cashRegister/cashRegister.routes";
import authRoutes from "./routes/auth/auth.routes";
import computerRoutes from "./routes/computer/computer.routes";
// import dotenv from "dotenv";

// dotenv.config();
var clientURI = {
  origin: [
    "http://localhost:3000",
    "http://192.168.0.148:3000",
    "https://navigamescbba.com",
  ],
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
app.use(bookRoutes);
app.use(productsRoutes);
app.use(cashRegisterRoutes);
app.use(authRoutes);
app.use(computerRoutes);

export default app;
