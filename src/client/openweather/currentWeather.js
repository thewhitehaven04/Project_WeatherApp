import { OpenWeatherClient } from './openweather';
/**
 * OpenWeather's CurrentWeather API client class.
 * @extends {OpenWeatherClient}
 */
class CurrentWeatherClient extends OpenWeatherClient {
  /**
   * @param {String} rootUrl OpenWeather's CurrentWeather controller root URL 
   */
  constructor(rootUrl) {
    super(rootUrl);
  }

  /**
   * Return weather data for the given point.
   * @param {Coordinates} coordinates geographical coordinates of the point to get the weather data for 
   */
  async getCurrentWeather(coordinates) {
    return (await this.get('weather', coordinates)).json()
  }
}

export { CurrentWeatherClient };