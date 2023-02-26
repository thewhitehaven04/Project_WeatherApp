import { ForecastClient } from '../client/openweather/forecast';
import { urls } from '../config/config';
import { units } from '../dto/openweather/requestEnums';

/**
 * @typedef {Object} ForecastService 
 * @property {function(units, Coordinates):void} update
 * @property {function():Promise<CurrentWeatherResponseDto>} getList 
 * @property {function():Promise<CityResponseDto>} getCity 
 * @property {function():Promise<ForecastInfoDto>} getForecast 
 */

/**
 * @param {ForecastClient} client
 * @returns {ForecastService}
 */
const ForecastService = (function (client) {
  /**
   * @type {Promise<ForecastResponseDto>}
   */
  let _response;
  let lastUpdated;

  /**
   * Request a five-day forecast from openweather API.
   * @async
   * @param {units} unit
   * @param {Coordinates} coords
   */
  const update = function (unit, coords) {
    lastUpdated = { lastUpdated: new Date() };
    _response = client.getFivedayForecast(coords, unit);
  };

  const getList = async () => (await _response).list;
  const getCity = async () => (await _response).city;
  const getForecast = async () => {
    return {
      city: getCity(),
      list: getList(),
    };
  };

  return { update, getCity, getList, getForecast };
})(new ForecastClient(urls.openWeatherApiRootUrl));
