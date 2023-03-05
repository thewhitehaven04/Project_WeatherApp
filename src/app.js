import { units } from './dto/openweather/requestEnums';
import { currentWeatherView } from './views/currentWeather/currentWeather';
import { CurrentWeather } from './components/currentWeather';
import { currentWeatherService } from './service/currentWeatherService';
// @ts-ignore
import style from './style.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { menu } from './components/menu/menu';
import { FivedayWeather } from './components/fiveDayWeather';
import { fiveDayForecastViewFactory } from './views/forecast/fiveDayForecastView';
import { forecastService } from './service/forecastService';

const app = (function () {
  const unit = units.METRIC;
  const body = document.querySelector('body');
  const main = document.createElement('main');
  const header = document.createElement('header');

  /**
   * Displays the new tab (DocumentFragment) in the main section of the application.
   * @param {DocumentFragment} tabFragment tab fragment to display;
   */
  function displayTab(tabFragment) {
    main.replaceChildren();
    main.appendChild(tabFragment);
  }

  async function run() {
    const currentWeather = CurrentWeather(
      currentWeatherService,
      currentWeatherView,
    );
    const fivedayWeather = await FivedayWeather(
      fiveDayForecastViewFactory,
      forecastService,
    );

    main.append(await currentWeather.render());
    header.append(
      menu([
        {
          displayName: 'Current weather',
          callback: async () => displayTab(await currentWeather.render()),
        },
        {
          displayName: 'Five-day forecast',
          callback: async () => displayTab(fivedayWeather.render()),
        },
      ]).render(),
    );
    body.append(header, main);
  }

  return { unit, run };
})();

app.run();

export { app };
