import { units } from '../../dto/openweather/requestEnums';
import { EventBus } from '../../event/eventBus';
import { TemperatureDataView } from '../temperature/temperature';

const requestCurrentWeatherEvent = 'requestCurrentWeatherEvent';

/**
 * @template T
 * @typedef {UpdatableView<T>} CurrentWeatherView<T>
 */

/**
 * @returns {CurrentWeatherView<CurrentWeatherDto>}
 * @param {units} unit
 */
function currentWeatherView(unit) {
  /**
   * @type {CurrentWeatherDto}
   */
  let currentState;

  const frag = document.createDocumentFragment();
  const tempsDiv = document.createElement('div');

  /** @type {function(Coordinates):void} */
  const _requestData = (coords) => {
    EventBus.notify(requestCurrentWeatherEvent, coords);
  };

  /**
   * Updates the state.
   * @param {CurrentWeatherDto} currentWeather
   */
  const setState = (currentWeather) => (currentState = currentWeather);

  /**
   * Updates values of the form with the values from `currentState`
   */
  const update = function () {
    tempsDiv.replaceChildren(
      TemperatureDataView(currentState.main, unit).render(),
    );
  };

  const render = function () {
    const article = document.createElement('article');
    article.classList.add('current-weather');

    update();

    const buttonUpdate = document.createElement('button');
    buttonUpdate.textContent = 'Update';
    buttonUpdate.addEventListener(
      'click',
      _requestData.bind(this, currentState.coord),
    );

    article.append(...[tempsDiv, buttonUpdate]);

    frag.replaceChildren(article);

    return frag;
  };

  const hide = () => {
    frag.replaceChildren();
  };

  return { render, hide, update, setState };
}

export { currentWeatherView, requestCurrentWeatherEvent };
