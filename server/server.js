/** @format */

// Packages
import express from "express";
import cors from "cors";
import colors from "colors";

// Routes
import { router as postRouter } from "./routes/postRoutes.js";

// Dotenv Config
import dotenv from "dotenv";
dotenv.config();

// MongoDB Connection
import { connectDB } from "./config/dbConnect.js";
connectDB();

// Express Initialization
const port = process.env.PORT || 5000;
const app = express();

// Middlewares
import { errorHandler } from "./middleware/errorMiddleware.js";
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// API Endpoints
app.use("/api/posts", postRouter);

// Creating server
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
});
