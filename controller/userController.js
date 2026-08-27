import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../services/user/userRegistration.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
});

router.get("/logout", authenticateToken, async (req, res) => {
  try {
    await logoutUser(req, res);
  } catch (error) {
    console.log("Error logging out user:", error);
    return res.json({ message: "error in logout user" });
  }
});

export default router;
