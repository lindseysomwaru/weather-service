/*
    Author: Lindsey Somwaru
    Date Last Edited: 22 Jan 2025
*/

import { AppDataSource } from "../utils/Database";
import { Weather } from "../models/Weather";

export class WeatherRepository {
  async save(weather: Weather): Promise<void> {
    const repo = AppDataSource.getRepository(Weather);
    await repo.save(weather);
  }

  async findAll(): Promise<Weather[]> {
    const repo = AppDataSource.getRepository(Weather);
    return repo.find();
  }
}