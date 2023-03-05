import { ForecastClient } from '../client/openweather/forecast';
import { urls } from '../config/config';
import { units } from '../dto/openweather/requestEnums';

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
    console.dir(await _response);
    return Object.assign(
      {},
      {
        city: await getCity(),
        list: await getList(),
      },
      lastUpdated,
    );
  };

  const biDailyForecast = async () => {
    return Object.assign(
      {},
      {
        city: await getCity(),
        list: await (
          await getList()
        ).filter((forecastWeatherResponseDto) => {
          const hour = new Date(
            forecastWeatherResponseDto.dt * 1000,
          ).getUTCHours();
          const offset = new Date().getUTCHours() - new Date().getHours();
          return hour + offset === 0 || hour + offset === 12;
        }),
      },
    );
  };

  return { update, getCity, getList, getForecast, biDailyForecast };
})(new ForecastClient(urls.openWeatherApiRootUrl));

export { forecastService };
