import { units } from '../../dto/openweather/requestEnums';
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
    super(rootUrl + 'data/2.5/');
  }

  /**
   * Return weather data for the given point.
   * @param {Coordinates} coordinates geographical coordinates of the point to get the weather data for
   * @param {units} units
   * @return {Promise<CurrentWeatherResponseDto>}
   */
  async getCurrentWeather(coordinates, units) {
    return (await this.get('weather', { ...coordinates, units })).json();
  }
}

export { CurrentWeatherClient };
