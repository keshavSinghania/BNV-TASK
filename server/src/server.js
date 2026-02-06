import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectMongoDb } from "./config/db.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4040;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running ");
});

app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Server error",
  });
});

const startServer = async () => {
  try {
    await connectMongoDb();
    app.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
