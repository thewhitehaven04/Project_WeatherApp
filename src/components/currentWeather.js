import { app } from '../app';
import { units } from '../dto/openweather/requestEnums';
import { EventBus } from '../event/eventBus';
import { getLocalCoordinates } from '../geolocation/geolocation';
import { loadingComponent } from '../views/loading/loading';

/**
 * @param {import("../service/weather").WeatherService} CurrentWeatherService
 * @param {function(units, function(Coordinates):void):import("../views/currentWeather/currentWeather").CurrentWeatherView<CurrentWeatherDto>} currenWeatherViewFactory
 * @param {HTMLElement} root root element of the component
 */
const CurrentWeather = function (
  CurrentWeatherService,
  currenWeatherViewFactory,
  root,
) {
  let initialLocation = getLocalCoordinates();
  let rootChild;
  const unit = app.unit;

  const view = currenWeatherViewFactory(unit, update);

  /** @param {Coordinates} location */
  async function update(location) {
    let loading = loadingComponent(rootChild);
    loading.show();
    CurrentWeatherService.update(unit, location);
    loading.hide();
    view.setState(await CurrentWeatherService.getCurrentWeather());
    view.update();
  }

  async function render() {
    let loading = loadingComponent(root);
    loading.show();
    CurrentWeatherService.update(unit, await initialLocation);
    loading.hide();
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
