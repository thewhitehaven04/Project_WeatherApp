import { CurrentWeatherClient } from '../client/openweather/currentWeather';
import { urls } from '../config/config';
import { units } from '../dto/openweather/enums';

/**
 * @typedef DayCycleDto information about day cycle
 * @property {Date} sunset
 * @property {Date} sunrise
 * @property {Number} dayLength
 */

/**
 * Current weather data enriched with the datetime of last update
 * @typedef {Object} CurrentWeatherInfo
 * @property {WeatherDto[]} weather
 * @property {WindDto} wind
 * @property {MainDto} main
 * @property {DayCycleDto} dayCycle
 * @property {Coordinates} coord
 * @property {Date} lastUpdated
 */

/**
 * @typedef {Object} WeatherService
 * @property {function(units, Coordinates):void} update
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

  /** @returns {Promise<MainDto>} */
  const getMain = async () => (await _response).main;

  /** @returns {Promise<WeatherDto[]>} */
  const getWeather = async () => (await _response).weather;

  /** @returns {Promise<WindDto>} */
  const getWind = async () => (await _response).wind;

  /** @returns {Promise<DayCycleDto>} */
  const getDayCycle = async () => {
    const response = await _response;
    const sunset = new Date(response.sys.sunset * 1000);
    const sunrise = new Date(response.sys.sunrise * 1000);
    return {
      sunset,
      sunrise,
      dayLength: (response.sys.sunset - response.sys.sunset) * 1000,
    };
  };

  /** @returns {Promise<CurrentWeatherInfo>} */
  const getCurrentWeather = async () => {
    return Object.assign(
      {},
      {
        main: (await _response).main,
        weather: (await _response).weather,
        wind: (await _response).wind,
        dayCycle: await getDayCycle(),
        coord: (await _response).coord,
      },
      lastUpdated,
    );
  };

  return {
    update,
    getCurrentWeather,
  };
})(new CurrentWeatherClient(urls.openWeatherApiRootUrl));

export { currentWeatherService };
