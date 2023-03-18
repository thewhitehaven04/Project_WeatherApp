import { app } from '../app';
import { EventBus } from '../event/eventBus';
import { getLocalCoordinates } from '../geolocation/geolocation';

/**
 * @param {import('../views/forecast/fiveDayForecastView').FiveDayForecastViewFactory} viewFactory
 * @param {import("../service/forecastService").ForecastService} service
 */
const FivedayWeather = async function (viewFactory, service) {
  /** @type {Coordinates} */
  let initialLocation = await getLocalCoordinates();
  /** @type UpdatableView<import('../service/forecastService').ForecastInfoDto> */
  service.update(app.unit, initialLocation);
  let view = viewFactory(await service.getBiDailyForecast(), update);

  async function update() {
    EventBus.notify('requestShowLoading', {});
    setTimeout(async () => {
      service.update(app.unit, initialLocation);
      view.setState(await service.getBiDailyForecast());
      view.update();
      EventBus.notify('requestStopLoading', {});
    }, 2500);
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
