import { units } from '../../dto/openweather/requestEnums';
import { LastUpdatedView } from '../lastUpdated/lastUpdated';
import { TemperatureDataView } from '../temperature/temperature';
import { WindView } from '../wind/wind';

/**
 * @template T
 * @typedef {UpdatableView<T>} CurrentWeatherView<T>
 */

/**
 * @param {units} unit
 * @param {function(Coordinates):void} requestWeatherCallback
 * @returns {CurrentWeatherView<CurrentWeatherResponseDto>}
 * @param {units} unit
 */
function currentWeatherView(unit, requestWeatherCallback) {
  /**
   * @type {CurrentWeatherInfo}
   */
  let currentState;

  const frag = document.createDocumentFragment();
  const tempsDiv = document.createElement('div');
  const windsDiv = document.createElement('div');
  const lastUpdatedDiv = document.createElement('div');

  /**
   * @param {Coordinates} params
   */
  const _requestWeatherData = (params) => requestWeatherCallback(params);

  /**
   * Updates the state.
   * @param {CurrentWeatherInfo} currentWeather
   */
  const setState = function (currentWeather) {
    currentState = currentWeather;
  };

  /**
   * Updates values of the form with the values from `currentState`
   */
  const update = function () {
    tempsDiv.replaceChildren(
      TemperatureDataView(currentState.main, unit).render(),
    );
    windsDiv.replaceChildren(WindView(currentState.wind, unit).render());
    lastUpdatedDiv.replaceChildren(
      LastUpdatedView(currentState.lastUpdated).render(),
    );
  };

  const render = function () {
    const article = document.createElement('article');
    article.classList.add('current-weather');

    update();

    const buttonUpdate = document.createElement('button');
    buttonUpdate.classList.add('current-weather__update');
    buttonUpdate.textContent = 'Update';
    buttonUpdate.addEventListener('click', () =>
      _requestWeatherData(currentState.coord),
    );

    tempsDiv.classList.add('current-weather__temperature');
    windsDiv.classList.add('current-weather__winds');
    lastUpdatedDiv.classList.add('current-weather__last-updated');
    article.append(...[tempsDiv, windsDiv, buttonUpdate, lastUpdatedDiv]);

    frag.replaceChildren(article);

    return frag;
  };

  const hide = () => {
    frag.replaceChildren();
  };

  return { render, hide, update, setState };
}

export { currentWeatherView };
