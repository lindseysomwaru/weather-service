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
    const weatherRepository = new WeatherRepository();
    await weatherRepository.clearWeatherData();
    startScheduler();
  })
  .catch((error) => {
    Logger.error(`Database initialization failed: ${error.message}`);
    process.exit(1);
  });

const weatherRepository = new WeatherRepository();

// GET endpoint to fetch weather data
app.get("/", async (req, res) => {
  try {
    const weatherData = await weatherRepository.findAll();
    res.json(weatherData);
  } catch (error) {
    Logger.error(`Error fetching weather data: ${error instanceof Error ? error.message : error}`);
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
});


// Start the Express server
app.listen(PORT, () => {
  Logger.info(`Server is running on http://localhost:${PORT}`);
});