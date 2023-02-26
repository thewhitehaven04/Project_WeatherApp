/**
 * Geographical coordinates
 * @typedef {Object} Coordinates
 * @property {Number} lat geographical latitude 
 * @property {Number} lon geographical longitude 
 */

/**
 * Location data
 * @typedef {Object} LocationDto
 * @property {String} cityName city name
 * @property {String} [stateCode] US state code
 * @property {String} [countryCode] country code as specified in ISO 3166 
 */

/**
 * General quantitative weather data at a given location. 
 * @typedef {Object} MainDto 
 * @prop {Number} feels_like
 * @prop {Number} grnd_level 
 * @prop {Number} humidity 
 * @prop {Number} pressure 
 * @prop {Number} sea_level 
 * @prop {Number} temp 
 * @prop {Number} temp_max 
 * @prop {Number} temp_min 
 */

/**
 * General qualitative weather data at a given location 
 * @typedef {Object} WeatherDto
 * @property {Number} id
 * @property {String} main type of weather (e.g. rain, sunny)
 * @property {String} description 
 * @property {String} icon 
 */

/**
 * General wind data at a given location
 * @typedef {Object} WindDto
 * @property {Number} speed
 * @property {Number} deg
 * @property {Number} gust 
 */

/**
 * Current weather data as returned from the OpenWeather API.
 * @typedef {{coord: ?Coordinates, main: ?MainDto, wind: ?WindDto, weather: ?WeatherDto[]}} CurrentWeatherDto
 */

/**
 * Current weather data enriched with the datetime of last update
 * @typedef {CurrentWeatherDto & {lastUpdated: Date}} CurrentWeatherInfo
 */