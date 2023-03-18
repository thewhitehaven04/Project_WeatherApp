import { app } from '../app';
import { EventBus } from '../event/eventBus';
import { getLocalCoordinates } from '../geolocation/geolocation';

/**
 * @param {import("../service/currentWeatherService").WeatherService} CurrentWeatherService
 * @param {import('../views/currentWeather/currentWeather').CurrentWeatherViewFactory} currentWeatherViewFactory
 */
const CurrentWeather = async function (
  CurrentWeatherService,
  currentWeatherViewFactory,
) {
  let initialLocation = getLocalCoordinates();
  let rootChild;
  const unit = app.unit;

  const view = currentWeatherViewFactory(unit, update);
  CurrentWeatherService.update(unit, await initialLocation);
  view.setState(await CurrentWeatherService.getCurrentWeather());

  /** @param {Coordinates} location */
  async function update(location) {
    EventBus.notify('requestShowLoading', {});
    CurrentWeatherService.update(unit, location);
    setTimeout(async () => {
      view.setState(await CurrentWeatherService.getCurrentWeather());
      view.update();
      EventBus.notify('requestStopLoading', {});
    }, 3000);
  }

  function render() {
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
