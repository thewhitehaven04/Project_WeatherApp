import { CurrentWeatherClient } from '../client/openweather/currentWeather';
import { urls } from '../config/config';
import { units } from '../dto/openweather/requestEnums';

/**
 * @typedef {Object} WeatherService
 * @property {function(units, Coordinates):void} update
 * @property {function():MainDto} getMain
 * @property {function():WeatherDto} getWeather
 * @property {function():WindDto} getWind
 * @property {function():CurrentWeatherDto} getCurrentWeather 
 */

/**
 * @param {CurrentWeatherClient} client
 */
const weatherService = ((client) => {
  /**
   * Latest acquired weather data.
   * @type {CurrentWeatherDto}
   */
  let _response;

  /**
   * Request current weather.
   * @async
   * @param {units} unit
   * @param {Coordinates} coords
   */
  async function update(unit, coords) {
    _response = await client.getCurrentWeather(coords, unit);
  }

  const getMain = () => _response.main;
  const getWeather = () => _response.weather;
  const getWind = () => _response.wind;
  const getCurrentWeather = () => _response;

  return {
    update,
    getMain,
    getWeather,
    getWind,
    getCurrentWeather,
  };
})(new CurrentWeatherClient(urls.openWeatherApiRootUrl));

export { weatherService };
