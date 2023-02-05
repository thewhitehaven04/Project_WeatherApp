import { ForecastClient } from "./client/openweather/forecast";
import { urls } from "./config/config";
import { units } from "./dto/openweather/requestEnums";

const body = document.querySelector('body');

const div = document.createElement('div');
div.textContent = 'Hello!';

body?.appendChild(div);

/**
 * @type {Coordinates}
 */
const coords = {
  lat: 45.23,
  lon: 19.82
};

(async () => {
  const forecastClient = new ForecastClient(urls.openWeatherApiRootUrl);
  const fiveDayForecast = await forecastClient.getFivedayForecast(coords, units.METRIC); 
  console.dir(fiveDayForecast)
})();