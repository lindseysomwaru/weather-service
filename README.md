# Weather Service Application

This is a backend service that collects, stores, and synchronizes weather data from the OpenWeatherMap API. The application is built using Node.js, TypeScript, and SQLite, with periodic synchronization handled by a scheduler.

## Features
- Fetches current weather data for predefined cities.
- Store weather data in an SQLite database.
- Periodically synchronizes data every 15 seconds using `node-cron`.
- Clears and resets the database on program termination.
- Provides a REST API to fetch stored weather data.
- Includes robust error handling and logging using `winston`.

## Technologies Used
- **Node.js**: JavaScript runtime for building the backend.
- **TypeScript**: Strongly typed language for enhanced maintainabiality.
- **Express**: Minimal framework for creating the API.
- **TypeORM**: Object-Relational Mapping for database operations.
- **SQLite**: Lightweight database for storage.
- **node-cron**: Scheduler for periodic tasks.
- **winston**: Logging utility for monitoring and debugging.

## Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

## Setup Instructions
1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd weather-service
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the project root with the following content:
    ```env
    OPENWEATHER_API_KEY=your_openweathermap_api_key
    PORT=3000
    ```
    Replace `your_openweathermap_api_key` with your actual OpenWeatherMap API key.

4. Build the project:
    ```bash
    npm run build
    ```

5. Start the application:
    ```bash
    npm start
    ```

6. Access the API:
    - Navigate to `http://localhost:3000`

## How It Works
1. **Initialization**: The database is initialized when the application starts.
2. **Periodic Synchronization**: A scheduler fetches weather data for predefined cities every 15 seconds and stores it in the database.
3. **Termination Handling**: On program termination (e.g. `Ctrl+C`), the database is cleared, and the primkary key counter is reset.

## Project Structure
```
weather-service/
├── src/
│   ├── models/
│   │   └── Weather.ts              # TypeORM entity for weather data
│   ├── repositories/
│   │   └── WeatherRepository.ts    # Handles database operations
│   ├── services/
│   │   └── WeatherService.ts       # Fetches weather data from the API
│   ├── utils/
│   │   ├── Logger.ts               # Logging utility
│   │   ├── Database.ts             # Database configuration
│   │   └── ConfigManager.ts        # Configuration management
│   ├── scheduler.ts                # Handles periodic synchronization
│   ├── app.ts                      # Main application entry point
├── .env                            # Environment variables
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── README.md                       # Documentation
```

## Design Decisions
- **SQLite**: Chosen for its simplicity and zero configuration requirements.
- **TypeORM**: Provides a clean and robust way to manage entities and database interactions.
- **node-cron**: Lightweight scheduler for periodic synchronization.
- **ConfigManager**: Centralized configuration management for environment variables.

## Testing:
1. Run unit tests:
    ```bash
    npm test
    ```

2. Perform manual testing by:
    - Monitoring `http://localhost:3000` endpoint.
    - Verifying logs for periodic synchronization.