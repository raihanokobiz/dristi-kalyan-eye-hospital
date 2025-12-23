const cors = require("cors");
const express = require("express");
const moment = require("moment-timezone");
const morgan = require("morgan");
const mongoose = require("mongoose");
const rootRouter = require("./src/api/index.js");
const config = require("./src/config/config.js");
const globalErrorHandler = require("./src/middleware/errors/globalErrorHandler.js");
const colors = require("colors");
const cloudinaryRoutes = require("./src/cloudinary/cloudinary.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//  Body parser limit for image
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

moment.tz.setDefault("Asia/Dhaka");
const currentDate = moment();

app.use(`/api/v1${config.uploadPath}`, express.static(config.uploadFolder));
app.use("/api/v1", rootRouter);

app.get("/api", (req, res, next) => {
  res.send("welcome to okobiz");
});

app.get("/time", (req, res, next) => {
  res.send(currentDate.format("YYYY-MM-DD HH:mm:ss"));
});

app.use("/api/v1/cloudinary", cloudinaryRoutes);

app.use(globalErrorHandler);

mongoose
  .connect(config.databaseUrl)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.error("Database connection error:", err.message);
    console.error("Full error details:", err);
  });

app.listen(config.port, () => {
  console.log(`app listening to port `, config.port);
});
