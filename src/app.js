import style from './style.css';
import { units } from './dto/openweather/enums';
import { currentWeatherView } from './views/currentWeather/currentWeather';
import { CurrentWeather } from './components/currentWeather';
import { currentWeatherService } from './service/currentWeatherService';
import '@fortawesome/fontawesome-free/js/all.js';
import { menu, menuFactory } from './components/menu/menu';
import { FivedayWeather } from './components/fiveDayWeather';
import { fiveDayForecastViewFactory } from './views/forecast/fiveDayForecastView';
import { forecastService } from './service/forecastService';
import { footerComponent } from './components/footer/footer';
import { MainComponent } from './components/main/main';
import { EventBus } from './event/eventBus';

const app = (function () {
  const unit = units.METRIC;
  const body = document.querySelector('body');
  const mainComponent = MainComponent;
  const footer = footerComponent();
  const header = document.createElement('header');

  async function run() {
    EventBus.notify('requestShowLoading', {});
    const currentWeather = CurrentWeather(
      currentWeatherService,
      currentWeatherView,
    );
    const fivedayWeather = await FivedayWeather(
      fiveDayForecastViewFactory,
      forecastService,
    );
    mainComponent.displayTab(await currentWeather.render());
    EventBus.notify('requestStopLoading', {});
    header.append(
      menuFactory([
        {
          displayName: 'Current weather',
          callback: async () =>
            mainComponent.displayTab(await currentWeather.render()),
        },
        {
          displayName: 'Five-day forecast',
          callback: async () =>
            mainComponent.displayTab(fivedayWeather.render()),
        },
      ]).render(),
    );
    body.append(header, mainComponent.render(), footer);
  }

  return { unit, run };
})();

app.run();

export { app };
