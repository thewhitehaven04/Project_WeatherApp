import { units } from '../dto/openweather/requestEnums';
import { EventBus } from '../event/eventBus';
import { getLocalCoordinates } from '../geolocation/geolocation';
import { requestCurrentWeatherEvent } from '../views/currentWeather/currentWeather';
import { loadingComponent } from '../views/loading/loading';

/**
 * @param {import("../service/weather").WeatherService} service
 * @param {import("../views/currentWeather/currentWeather").CurrentWeatherView<CurrentWeatherDto>} view
 * @param {units} unit
 */
const CurrentWeather = async function (service, view, unit, root) {
  let initialLocation = await getLocalCoordinates();
  let rootChild;

  /**
   * @param {Coordinates} location
   */
  const update = function (location) {
    let loading = loadingComponent(rootChild);
    loading.show();
    service.update(unit, location);
    loading.hide();
    view.setState(service.getCurrentWeather());
  };

  const render = function () {
    let loading = loadingComponent(root);
    loading.show();
    service.update(unit, initialLocation);
    loading.hide();
    view.setState(service.getCurrentWeather());
    rootChild = view.render();
    return rootChild;
  };

  const hide = () => view.hide();

  EventBus.subscribe(requestCurrentWeatherEvent, update);

  return {
    update,
    render,
  };
};

export { CurrentWeather };
