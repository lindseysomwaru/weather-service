/*
    Author: Lindsey Somwaru
    Date Last Edited: 22 Jan 2025
*/

import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./utils/Database";
import { Logger } from "./utils/Logger";
import { WeatherService } from "./services/WeatherService";
import { WeatherRepository } from "./repositories/WeatherRepository";
import cron from "node-cron";

// Load environment variables
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY || "";

// Initialize the database
AppDataSource.initialize()
  .then(() => {
    Logger.info("Database initialized successfully.");
  })
  .catch((error) => {
    Logger.error(`Database initialization failed: ${error.message}`);
    process.exit(1);
  });

// Weather service setup
const weatherRepository = new WeatherRepository();
const weatherService = new WeatherService(API_KEY, weatherRepository);
const cities = ["New York", "London", "Tokyo", "Mumbai", "Sydney"];

// Schedule periodic weather data synchronization
cron.schedule("*/15 * * * *", async () => {
  Logger.info("Starting scheduled weather data synchronization...");
  for (const city of cities) {
    try {
      await weatherService.fetchWeather(city);
      Logger.info(`Weather data for ${city} synchronized successfully.`);
    } catch (error) {
      Logger.error(`Failed to synchronize weather data for ${city}: ${error instanceof Error ? error.message : error}`);
    }
  }
});

// Start the Express server
app.listen(PORT, () => {
  Logger.info(`Server is running on http://localhost:${PORT}`);
});