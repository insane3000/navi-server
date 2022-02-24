import express from "express";
import morgan from "morgan";
import config from "./config";
import cors from "cors";
import productsRoutes from "./routes/products/products.routes";
import cashRegisterRoutes from "./routes/cashRegister/cashRegister.routes";
import authRoutes from "./routes/auth/auth.routes";
import computerRoutes from "./routes/computer/computer.routes";
import invoiceRoutes from "./routes/invoice/invoice.routes";
// import dotenv from "dotenv";
import path from "path";
// dotenv.config();
var clientURI = {
  origin: [
    "http://localhost:3000",
    "http://192.168.0.148:3000",
    "https://navigamescbba.com",
    "https://dtid09x3ren7e.cloudfront.net",
    "http://shoke.cc.s3-website-sa-east-1.amazonaws.com",
  ],
};
const app = express();
app.set("port", config.PORT);
app.use(morgan("dev"));
app.use(cors(clientURI));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(productsRoutes);
app.use(cashRegisterRoutes);
app.use(authRoutes);
app.use(computerRoutes);
app.use(invoiceRoutes);
app.use("/static", express.static(path.join(__dirname, "../public")));

export default app;
