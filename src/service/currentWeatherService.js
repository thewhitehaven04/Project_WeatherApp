import { CurrentWeatherClient } from '../client/openweather/currentWeather';
import { urls } from '../config/config';
import { units } from '../dto/openweather/requestEnums';

/**
 * Current weather data enriched with the datetime of last update
 * @typedef {CurrentWeatherResponseDto & {lastUpdated: Date}} CurrentWeatherInfo
 */

/**
 * @typedef {Object} WeatherService
 * @property {function(units, Coordinates):void} update
 * @property {function():Promise<MainDto>} getMain
 * @property {function():Promise<WeatherDto[]>} getWeather
 * @property {function():Promise<WindDto>} getWind
 * @property {function():Promise<CurrentWeatherInfo>} getCurrentWeather
 */

/**
 * @param {CurrentWeatherClient} client
 * @returns {WeatherService}
 */
const currentWeatherService = ((client) => {
  /**
   * Latest acquired weather data.
   * @type {Promise<CurrentWeatherResponseDto>}
   */
  let _response;
  let lastUpdated;

  /**
   * Request current weather.
   * @async
   * @param {units} unit
   * @param {Coordinates} coords
   */
  function update(unit, coords) {
    lastUpdated = { lastUpdated: new Date() };
    _response = client.getCurrentWeather(coords, unit);
  }

  /**
   * @returns {Promise<MainDto>}
   */
  const getMain = async () => (await _response).main;
  /**
   * @returns {Promise<WeatherDto[]>}
   */
  const getWeather = async () => (await _response).weather;
  /**
   * @returns {Promise<WindDto>}
   */
  const getWind = async () => (await _response).wind;
  /**
   * @returns {Promise<CurrentWeatherInfo>}
   */
  const getCurrentWeather = async () =>
    Object.assign({}, await _response, lastUpdated);

  return {
    update,
    getMain,
    getWeather,
    getWind,
    getCurrentWeather,
  };
})(new CurrentWeatherClient(urls.openWeatherApiRootUrl));

export { currentWeatherService };
