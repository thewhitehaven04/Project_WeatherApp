import style from './style.css';
import { units } from './dto/openweather/enums';
import { currentWeatherView } from './views/currentWeather/currentWeather';
import { CurrentWeather } from './components/currentWeather';
import { currentWeatherService } from './service/currentWeatherService';
import '@fortawesome/fontawesome-free/js/all.js';
import { menuFactory } from './components/menu/menu';
import { FivedayWeather } from './components/fiveDayWeather';
import { fiveDayForecastViewFactory } from './views/forecast/fiveDayForecastView';
import { forecastService } from './service/forecastService';
import { FooterComponent } from './components/footer/footer';
import { MainComponent } from './components/main/main';
import { EventBus } from './event/eventBus';
import { loadingComponentFactory } from './views/loading/loading';

const app = (function () {
  const unit = units.METRIC;
  const header = document.createElement('header');
  const body = document.querySelector('body');
  const loadingComponent = loadingComponentFactory(body);

  EventBus.subscribe('requestShowLoading', loadingComponent.show);
  EventBus.subscribe('requestStopLoading', loadingComponent.hide);

  async function run() {
    const currentWeather = await CurrentWeather(
      currentWeatherService,
      currentWeatherView,
    );
    const fivedayWeather = await FivedayWeather(
      fiveDayForecastViewFactory,
      forecastService,
    );
    MainComponent.displayTab(currentWeather.render());
    header.append(
      menuFactory([
        {
          displayName: 'Current weather',
          callback: async () =>
            MainComponent.displayTab(currentWeather.render()),
        },
        {
          displayName: 'Five-day forecast',
          callback: async () =>
            MainComponent.displayTab(fivedayWeather.render()),
        },
      ]).render(),
    );

    body.append(header, MainComponent.render(), FooterComponent.render());
  }

  return { unit, run };
})();

app.run();

export { app };
