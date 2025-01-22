/*
    Author: Lindsey Somwaru
    Date Last Edited: 22 Jan 2025
*/

import winston from "winston";

export const Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" })
  ]
});