import { ForecastClient } from '../client/openweather/forecast';
import { urls } from '../config/config';
import { units } from '../dto/openweather/enums';

/**
 * @typedef {{
 *  city: CityResponseDto,
 *  list: Array<ForecastWeatherResponseDto>,
 *  lastUpdated: Date
 * }} ForecastInfoDto
 */

/**
 * @typedef {Object} ForecastService
 * @property {function(units, Coordinates):void} update
 * @property {function():Promise<Array<ForecastWeatherResponseDto>>} getList
 * @property {function():Promise<CityResponseDto>} getCity
 * @property {function():Promise<ForecastInfoDto>} getForecast
 * @property {function():Promise<ForecastInfoDto>} getBiDailyForecast
 */

/**
 * @param {ForecastClient} client
 * @returns {ForecastService}
 */
const forecastService = (function (client) {
  /**
   * @type {Promise<import('../client/openweather/forecast').ForecastResponseDto>}
   */
  let _response;

  /** @type {{lastUpdated: Date}} */
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

  /** @returns {Promise<Array<ForecastWeatherResponseDto>>} */
  const getList = async () => (await _response).list;
  /** @returns {Promise<CityResponseDto>} */
  const getCity = async () => (await _response).city;

  /** @returns {Promise<ForecastInfoDto>} */
  const getForecast = async () => {
    return Object.assign(
      {},
      {
        city: await getCity(),
        list: await getList(),
      },
      lastUpdated,
    );
  };

  /** @returns {Promise<ForecastInfoDto>} */
  const getBiDailyForecast = async () => {
    return Object.assign(
      {},
      {
        city: await getCity(),
        list: (await getList()).filter((forecastWeatherResponseDto) => {
          const hour = new Date(
            forecastWeatherResponseDto.dt * 1000,
          ).getUTCHours();
          return hour === 0 || hour === 12;
        }),
      },
      lastUpdated,
    );
  };

  return { update, getCity, getList, getForecast, getBiDailyForecast };
})(new ForecastClient(urls.openWeatherApiRootUrl));

export { forecastService };
