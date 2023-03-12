import { units } from '../../dto/openweather/enums';
import { OpenWeatherIconURLBuilderService } from '../../service/iconService';
import { dayCycleViewFactory } from '../dayCycle/dayCycle';
import { LastUpdatedView } from '../lastUpdated/lastUpdated';
import { loadingComponentFactory } from '../loading/loading';
import {
  formatTemperatureForUnit,
  TemperatureDataView,
} from '../temperature/temperature';
import { WindView } from '../wind/wind';
import style from './style.css';

/**
 * @template T
 * @typedef {UpdatableView<T>} CurrentWeatherView<T>
 */

/** @typedef {function(units, Function): CurrentWeatherView<import('../../service/currentWeatherService').CurrentWeatherInfo>} CurrentWeatherViewFactory */

/**
 * @param {units} unit
 * @param {function(Coordinates):void} requestWeatherCallback
 * @returns {CurrentWeatherView<import('../../service/currentWeatherService').CurrentWeatherInfo>}
 */
function currentWeatherView(unit, requestWeatherCallback) {
  /** @type {import('../../service/currentWeatherService').CurrentWeatherInfo} */
  let currentState;

  let frag = document.createDocumentFragment();
  const tempsDiv = document.createElement('div');
  const windsDiv = document.createElement('div');
  const lastUpdatedDiv = document.createElement('div');
  const weatherIcon = document.createElement('img');
  const spanAvgTemp = document.createElement('span');
  const daycycle = document.createElement('ul');

  tempsDiv.classList.add('current-weather__temperature');
  windsDiv.classList.add('current-weather__winds');
  lastUpdatedDiv.classList.add('current-weather__last-updated');
  weatherIcon.classList.add('current-weather__icon_normal');
  spanAvgTemp.classList.add(
    'current-weather__temperature-avg',
    'temperature-font__large',
  );
  daycycle.classList.add('current-weather__daycycle');

  /** @param {Coordinates} params */
  const _requestWeatherData = (params) => requestWeatherCallback(params);

  /**
   * Updates the state.
   * @param {import('../../service/currentWeatherService').CurrentWeatherInfo} currentWeather
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
    weatherIcon.src = OpenWeatherIconURLBuilderService.getLargeIconSource(
      currentState.weather[0].icon,
    );
    spanAvgTemp.textContent = formatTemperatureForUnit(
      currentState.main.temp,
      unit,
    );
    daycycle.replaceChildren(
      dayCycleViewFactory(currentState.dayCycle).render(),
    );
  };

  const render = function () {
    const article = document.createElement('article');
    article.classList.add('current-weather');

    update();

    const bottom = document.createElement('div');
    bottom.classList.add('current-weather-section__bottom');

    const buttonUpdate = document.createElement('button');
    buttonUpdate.textContent = 'Update';
    buttonUpdate.addEventListener('click', () => {
      _requestWeatherData(currentState.coord);
    });
    bottom.append(buttonUpdate, lastUpdatedDiv);

    article.append(
      ...[weatherIcon, spanAvgTemp, tempsDiv, windsDiv, daycycle, bottom],
    );

    frag.replaceChildren(article);

    return frag;
  };

  const hide = () => {
    frag.replaceChildren();
  };

  return { render, hide, update, setState };
}

export { currentWeatherView };
