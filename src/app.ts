/*
    Author: Lindsey Somwaru
    Date Last Edited: 24 Jan 2025
*/

import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./utils/Database";
import { Logger } from "./utils/Logger";
import { startScheduler } from "./scheduler";
import { ConfigManager } from "./utils/ConfigManager";
import { WeatherRepository } from "./repositories/WeatherRepository";

// Load environment variables
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = ConfigManager.get("OPENWEATHER_API_KEY");

// Initialize the database
AppDataSource.initialize()
  .then(async () => {
    Logger.info("Database initialized successfully.");
    startScheduler();
  })
  .catch((error) => {
    Logger.error(`Database initialization failed: ${error.message}`);
    process.exit(1);
  });

const weatherRepository = new WeatherRepository();

let cleanupCalled = false;
process.on("SIGINT", async () => {
  if(cleanupCalled) return;
  cleanupCalled = true;
  Logger.info("Received termination signal. Cleaning up...");

  try {
    // Clear and reset the weather table
    await weatherRepository.clearWeatherData();
  } catch (error) {
    Logger.error(`Failed to reset weather table on exit: ${error instanceof Error ? error.message : error}`);
  } finally {
    // Close the database connection
    await AppDataSource.destroy();
    Logger.info("Database connection closed.");
    process.exit(0);
  }
});

// Start the Express server
app.listen(PORT, () => {
  Logger.info(`Server is running on http://localhost:${PORT}`);
});