import axios from "axios";
import { WeatherRepository } from "../repositories/WeatherRepository";
import { Weather } from "../models/Weather";
import { Logger } from "../utils/Logger";

export class WeatherService {
  private apiKey: string;
  private weatherRepository: WeatherRepository;

  constructor(apiKey: string, weatherRepository: WeatherRepository) {
    this.apiKey = apiKey;
    this.weatherRepository = weatherRepository;
  }

  async fetchWeather(city: string): Promise<void> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
    try {
      const response = await axios.get(url);
      const data = response.data;

      const weather = new Weather();
      weather.city = city;
      weather.temperature = data.main.temp;
      weather.description = data.weather[0].description;
      weather.timestamp = new Date();

      await this.weatherRepository.save(weather);
      Logger.info(`Weather data for ${city} saved successfully.`);
    } catch (error) {
        const err = error as Error;
        Logger.error(`Error fetching weather data for ${city}: ${err.message}`);
        throw error;
    }
  }
}