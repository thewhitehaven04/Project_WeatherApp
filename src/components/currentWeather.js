import { app } from '../app';
import { units } from '../dto/openweather/enums';
import { getLocalCoordinates } from '../geolocation/geolocation';

/**
 * @param {import("../service/currentWeatherService").WeatherService} CurrentWeatherService
 * @param {import('../views/currentWeather/currentWeather').CurrentWeatherViewFactory} currentWeatherViewFactory
 */
const CurrentWeather = function (
  CurrentWeatherService,
  currentWeatherViewFactory,
) {
  let initialLocation = getLocalCoordinates();
  let rootChild;
  const unit = app.unit;

  const view = currentWeatherViewFactory(unit, update);

  /** @param {Coordinates} location */
  async function update(location) {
    CurrentWeatherService.update(unit, location);
    view.setState(await CurrentWeatherService.getCurrentWeather());
    view.update();
  }

  async function render() {
    CurrentWeatherService.update(unit, await initialLocation);
    view.setState(await CurrentWeatherService.getCurrentWeather());
    rootChild = view.render();
    return rootChild;
  }

  const hide = () => view.hide();

  return {
    update,
    render,
    hide,
  };
};

export { CurrentWeather };
