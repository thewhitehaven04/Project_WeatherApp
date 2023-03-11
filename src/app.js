import style from './style.css';
import { units } from './dto/openweather/enums';
import { currentWeatherView } from './views/currentWeather/currentWeather';
import { CurrentWeather } from './components/currentWeather';
import { currentWeatherService } from './service/currentWeatherService';
import '@fortawesome/fontawesome-free/js/all.js';
import { menu } from './components/menu/menu';
import { FivedayWeather } from './components/fiveDayWeather';
import { fiveDayForecastViewFactory } from './views/forecast/fiveDayForecastView';
import { forecastService } from './service/forecastService';
import { footerComponent } from './components/footer/footer';
import { mainComponent } from './components/main';

const app = (function () {
  const unit = units.METRIC;
  const body = document.querySelector('body');
  const main = mainComponent();
  const footer = footerComponent();
  const header = document.createElement('header');

  /**
   * Displays the new tab (DocumentFragment) in the main section of the application.
   * @param {DocumentFragment} tabFragment tab fragment to display;
   */
  function displayTab(tabFragment) {
    console.log(tabFragment.firstElementChild.innerHTML);
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
    body.append(header, main, footer);
  }

  return { unit, run };
})();

app.run();

export { app };
