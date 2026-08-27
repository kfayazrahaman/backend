import express from "express";
import { upload } from "../services/fileUpload.js";

const fileRouter = express.Router();

fileRouter.post("/file", upload.single("file"), async (req, res) => {
  try {
    // await fileUpload(req, res); // This function is missing, need to implement or remove it
    return res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { fileRouter };
