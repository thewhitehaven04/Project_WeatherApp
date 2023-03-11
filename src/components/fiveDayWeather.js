import { app } from '../app';
import { getLocalCoordinates } from '../geolocation/geolocation';
import { dayForecastViewFactory } from '../views/forecast/dayForecastView';

/**
 * @param {import('../views/forecast/fiveDayForecastView').FiveDayForecastViewFactory} viewFactory
 * @param {import("../service/forecastService").ForecastService} service
 */
const FivedayWeather = async function (viewFactory, service) {
  /** @type {Coordinates} */
  let initialLocation = await getLocalCoordinates();
  /**
   * @type UpdatableView<import('../service/forecastService').ForecastInfoDto>
   */
  service.update(app.unit, initialLocation);
  let view = viewFactory(await service.getBiDailyForecast(), update);

  async function update() {
    service.update(app.unit, initialLocation);
    view.setState(await service.getBiDailyForecast());
    view.update();
  }

  function render() {
    return view.render();
  }

  function hide() {
    view.hide();
  }

  return { render, update, hide };
};

export { FivedayWeather };
