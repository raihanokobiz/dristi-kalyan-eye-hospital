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

// CORS configuration
app.use(cors());

// Logging middleware (use conditional logging for production)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined")); // More detailed logs for production
}

// Body parser middleware with size limits
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Set default timezone
moment.tz.setDefault("Asia/Dhaka");
const currentDate = moment();

// Static file serving
app.use(`/api/v1${config.uploadPath}`, express.static(config.uploadFolder));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: currentDate.format("YYYY-MM-DD HH:mm:ss"),
    uptime: process.uptime(),
  });
});

// API routes
app.use("/api/v1", rootRouter);

app.get("/api", (req, res) => {
  res.send("Welcome to Eye Hospital API");
});

app.get("/time", (req, res) => {
  res.json({
    time: currentDate.format("YYYY-MM-DD HH:mm:ss"),
    timezone: "Asia/Dhaka",
  });
});

app.use("/api/v1/cloudinary", cloudinaryRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler (must be last)
app.use(globalErrorHandler);

// Database connection with retry logic
const connectDB = async (retries = 5) => {
  try {
    await mongoose.connect(config.databaseUrl, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(colors.green.bold("✓ Database connected successfully"));
  } catch (err) {
    console.error(colors.red.bold("✗ Database connection error:"), err.message);
    
    if (retries > 0) {
      console.log(colors.yellow(`Retrying connection... (${retries} attempts left)`));
      setTimeout(() => connectDB(retries - 1), 5000);
    } else {
      console.error(colors.red.bold("Failed to connect to database after multiple attempts"));
      process.exit(1);
    }
  }
};

connectDB();

// Start server
const server = app.listen(config.port, () => {
  console.log(colors.cyan.bold(`✓ Server is running on port ${config.port}`));
  console.log(colors.cyan(`Environment: ${process.env.NODE_ENV || "development"}`));
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(colors.yellow(`\n${signal} received. Starting graceful shutdown...`));
  
  server.close(() => {
    console.log(colors.yellow("HTTP server closed"));
    
    mongoose.connection.close(false, () => {
      console.log(colors.yellow("MongoDB connection closed"));
      process.exit(0);
    });
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error(colors.red("Forcing shutdown after timeout"));
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(colors.red.bold("Unhandled Promise Rejection:"), err);
  gracefulShutdown("unhandledRejection");
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(colors.red.bold("Uncaught Exception:"), err);
  gracefulShutdown("uncaughtException");
});

module.exports = app;
