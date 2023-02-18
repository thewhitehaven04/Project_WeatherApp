import { CurrentWeatherClient } from './client/openweather/currentWeather';
import { urls } from './config/config';
import { units } from './dto/openweather/requestEnums';
import { getLocalCoordinates } from './geolocation/geolocation';
import { currentWeatherView } from './views/currentWeather/currentWeather';
import style from './style.css';
import { CurrentWeather } from './components/currentWeather';
import { weatherService } from './service/weather';

const body = document.querySelector('body');

const app = {
  unit: units.METRIC,
  run: async () => {
    body.append(
      (
        await CurrentWeather(
          weatherService,
          currentWeatherView(units.METRIC),
          units.METRIC,
        )
      ).render(),
    );
  },
};

app.run();

export { app };
