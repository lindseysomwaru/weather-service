import cron from "node-cron";
import { Logger } from "./utils/Logger";
import { WeatherService } from "./services/WeatherService";
import { WeatherRepository } from "./repositories/WeatherRepository";
import { ConfigManager } from "./utils/ConfigManager";

const API_KEY = ConfigManager.get("OPENWEATHER_API_KEY");
const weatherRepository = new WeatherRepository();
const weatherService = new WeatherService(API_KEY, weatherRepository);

const cities = ["New York", "London", "Tokyo", "Mumbai", "Sydney"];

// Schedule periodic weather data synchronization
export const startScheduler = () => {
  cron.schedule("*/15 * * * *", async () => {
    Logger.info("Cron job triggered: Synchronizing weather data...");
    for (const city of cities) {
      try {
        await weatherService.fetchWeather(city);
        Logger.info(`Weather data synchronized for ${city}`);
      } catch (error) {
        Logger.error(`Error during cron job for ${city}: ${error instanceof Error ? error.message : error}`);
      }
    }
  });

  Logger.info("Scheduler started: Weather data will be synchronized every 15 minutes.");
};