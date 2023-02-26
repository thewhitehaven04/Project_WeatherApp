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
 * @typedef {Object} RainDto
 * @property {Number} 1h amount of rain in a given unit
 */

/**
 * @typedef {Object} CloudsDto
 * @property {Number} all percentage of cloud density
 */

/**
 * @typedef {Object} SystemDto
 * @property {Number} type internal param
 * @property {Number} id internal param
 * @property {String} message internal param
 * @property {String} country contry
 * @property {Number} sunrise time of sunrise
 * @property {Number} sunset time of sunset
 */

/**
 * Current weather data as returned from the OpenWeather API.
 * @typedef {{
 * coord: ?Coordinates,
 * main: ?MainDto,
 * wind: ?WindDto,
 * weather: ?WeatherDto[],
 * base: ?string,
 * visibility: ?string,
 * rain: ?RainDto, 
 * system: ?SystemDto
 * }} CurrentWeatherResponseDto
 */

/**
 * Current weather data enriched with the datetime of last update
 * @typedef {CurrentWeatherResponseDto & {lastUpdated: Date}} CurrentWeatherInfo
 */

/**
 * @typedef {Object} CityResponseDto
 * @property {Number} id
 * @property {Coordinates} coord city location
 * @property {String} country  
 * @property {Number} timezone shift from UTC in seconds
 * @property {Number} population city population  
 * @property {Number} sunrise time of sunrise in UTC
 * @property {Number} sunset time of sunset in UTC
 */

/**
 * @typedef {{
 * list: CurrentWeatherResponseDto, 
 * city: CityResponseDto, 
 * cod: String, 
 * message: String, 
 * cnt: Number
 * }} ForecastResponseDto
 */
