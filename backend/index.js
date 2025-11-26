import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
import fs from "fs";

dotenv.config();
const app = express();

// ------------ BASIC MIDDLEWARE ------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ------------ CORS ------------
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:6000"],
    credentials: true,
  })
);

// ------------ API ROUTES ------------
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ------------ FRONTEND SERVING ------------
const frontendPath = path.join(process.cwd(), "frontend", "dist");

console.log("Path:", frontendPath);
console.log("Exists:", fs.existsSync(frontendPath));

// Serve static files
app.use(express.static(frontendPath));

// React router fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ------------ START SERVER ------------
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;

    // IMPORTANT FIX → listen on ALL interfaces
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });
