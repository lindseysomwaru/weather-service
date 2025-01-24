/*
    Author: Lindsey Somwaru
    Date Last Edited: 24 Jan 2025
*/

import { DataSource } from "typeorm";
import { Weather } from "../models/Weather";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "weather_data.db",
  synchronize: true,
  logging: false,
  entities: [Weather],
});
