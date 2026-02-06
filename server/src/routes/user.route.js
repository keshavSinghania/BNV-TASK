import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  exportUsersCSV,
} from "../controllers/user.controller.js";

export const userRoutes = express.Router();
userRoutes.get("/", getUsers);
userRoutes.get("/export", exportUsersCSV);
userRoutes.post("/", upload.single("avatar"), createUser);
userRoutes.put("/:id", upload.single("avatar"), updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
