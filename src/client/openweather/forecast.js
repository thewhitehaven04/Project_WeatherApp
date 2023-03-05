import { units } from '../../dto/openweather/requestEnums';
import { OpenWeatherClient } from './openweather';

/**
 * @typedef {{
 * list: Array<ForecastWeatherResponseDto>,
 * city: CityResponseDto,
 * cod: String,
 * message: String,
 * cnt: Number
 * }} ForecastResponseDto
 */
class ForecastClient extends OpenWeatherClient {
  /**
   * @param {String} rootUrl OpenWeather's Forecast controller root URL
   */
  constructor(rootUrl) {
    super(rootUrl + 'data/2.5/forecast');
  }

  /**
   * Get an hourly forecast for the following 4 days.
   * @async
   * @param {Coordinates} coordinates
   * @param {units} units
   * @returns {Promise<ForecastResponseDto>}
   */
  async getFivedayForecast(coordinates, units) {
    return await (await this.get('', { ...coordinates, units })).json();
  }
}

export { ForecastClient };
