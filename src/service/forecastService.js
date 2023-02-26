import { ForecastClient } from '../client/openweather/forecast';
import { urls } from '../config/config';
import { units } from '../dto/openweather/requestEnums';

/**
 * @param {ForecastClient} client
 */
const ForecastService = (function (client) {
  /**
   * @type  
   */
  let _response;
  let lastUpdated;

  /**
   * Request current weather.
   * @async
   * @param {units} unit
   * @param {Coordinates} coords
   */
  const update = function (unit, coords) {
    lastUpdated = { lastUpdated: new Date() };
    _response = client.getFivedayForecast(coords, unit);
  };

  return { update };

})(new ForecastClient(urls.openWeatherApiRootUrl));
