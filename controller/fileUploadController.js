import express from "express";
import { fileUpload } from "./fileUploadController.js";

const fileRouter = express.Router();

fileRouter.post("/file",  async (req, res) => {
  try {
    await fileUpload(req, res);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { fileRouter };
