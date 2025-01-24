/*
    Author: Lindsey Somwaru
    Date Last Edited: 24 Jan 2025
*/
import * as dotenv from "dotenv";
dotenv.config();

export class ConfigManager {
  static get(key: string, defaultValue: string = ""): string {
    const value = process.env[key];
    if (!value && defaultValue === "") {
      throw new Error(`Configuration key '${key}' is missing. Please set it in the .env file.`);
    }
    return value || defaultValue;
  }
}