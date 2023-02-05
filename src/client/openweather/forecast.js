import { units } from '../../dto/openweather/requestEnums';
import { OpenWeatherClient } from './openweather';

class ForecastClient extends OpenWeatherClient {
  /**
   * @param {String} rootUrl OpenWeather's Forecast controller root URL
   */
  constructor(rootUrl) {
    super(rootUrl + '/forecast');
  }

  /**
   * Get an hourly forecast for the following 4 days.
   * @param {Coordinates} coordinates
   * @param {units} units
   */
  async getFivedayForecast(coordinates, units) {
    return await (await this.get('', { ...coordinates, units })).json();
  }

}

export { ForecastClient };
