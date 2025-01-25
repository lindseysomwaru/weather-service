/*
    Author: Lindsey Somwaru
    Date Last Edited: 24 Jan 2025
*/

import axios from 'axios';
import { WeatherService } from '../WeatherService';
import { WeatherRepository } from '../../repositories/WeatherRepository';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../../repositories/WeatherRepository');
const mockedRepository = new WeatherRepository() as jest.Mocked<WeatherRepository>;

describe('WeatherService', () => {
  const API_KEY = 'test_api_key';
  let weatherService: WeatherService;

  beforeEach(() => {
    weatherService = new WeatherService(API_KEY, mockedRepository);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should fetch weather data and save it to the repository', async () => {
    // Mock Axios response
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        main: { temp: 298.15 },
        weather: [{ description: 'clear sky' }],
      },
    });

    // Mock repository save method
    mockedRepository.save = jest.fn();

    await weatherService.fetchWeather('London');

    // Verify Axios was called with the correct URL
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?q=London&appid=test_api_key'
    );

    // Verify repository save method was called with the correct data
    expect(mockedRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        city: 'London',
        temperature: 298.15,
        description: 'clear sky',
      })
    );
  });

  it('should throw an error if the API call fails', async () => {
    // Mock Axios to reject
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    await expect(weatherService.fetchWeather('London')).rejects.toThrow('API Error');

    // Verify repository save was not called
    expect(mockedRepository.save).not.toHaveBeenCalled();
  });
});
