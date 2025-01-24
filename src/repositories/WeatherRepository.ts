/*
    Author: Lindsey Somwaru
    Date Last Edited: 24 Jan 2025
*/

import { AppDataSource } from "../utils/Database";
import { Weather } from "../models/Weather";
import { Logger } from "../utils/Logger";

export class WeatherRepository {
  async save(weather: Weather): Promise<void> {
    const repo = AppDataSource.getRepository(Weather);
    await repo.save(weather);
  }

  async findAll(): Promise<Weather[]> {
    const repo = AppDataSource.getRepository(Weather);
    return repo.find();
  }

  async clearWeatherData(): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.query(`DELETE FROM weather`);
      await queryRunner.query(`DELETE FROM sqlite_sequence WHERE name='weather'`);

      Logger.info("Weather table cleared and primary key reset.");
    } catch (error) {
        Logger.error(`Failed to reset Weather table: ${error instanceof Error ? error.message : error}`);
    } finally {
        await queryRunner.release();
    }
  }
}