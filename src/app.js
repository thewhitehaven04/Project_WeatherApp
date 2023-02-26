import { units } from './dto/openweather/requestEnums';
import { currentWeatherView } from './views/currentWeather/currentWeather';
import { CurrentWeather } from './components/currentWeather';
import { CurrentWeatherService } from './service/weather';
import style from './style.css';
import '@fortawesome/fontawesome-free/js/all.js';

const body = document.querySelector('body');

const app = {
  unit: units.METRIC,
  run: async () => {
    const currentWeather = CurrentWeather(
      CurrentWeatherService,
      currentWeatherView,
      body,
    );
    body.append(await currentWeather.render());
  },
};

app.run();

export { app };
