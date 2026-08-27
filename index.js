import express from "express";
import dotenv from "dotenv";
import router from "./controller/userController.js";
import dbConnect from "./db.js";
import { fileRouter } from "./controller/fileUploadController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

dbConnect
  .sync()
  .then(() => {
    console.log("Database synchronized...");
  })
  .catch((err) => {
    console.log("Error synchronizing database:", err);
  });

app.use(express.json());
app.use(router);
app.use(fileRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("server run on port " + port);
});
