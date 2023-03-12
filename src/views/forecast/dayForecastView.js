import { format } from 'date-fns';
import { app } from '../../app';
import { units } from '../../dto/openweather/enums';
import { OpenWeatherIconURLBuilderService } from '../../service/iconService';
import {
  formatTemperatureForUnit,
  TemperatureDataView,
} from '../temperature/temperature';
import style from './dayForecastView.css';

/** @typedef {function(units, ForecastWeatherResponseDto): UpdatableView<ForecastWeatherResponseDto>} DayForecastViewFactory */
/** @typedef {UpdatableView<ForecastWeatherResponseDto>} DayForecastView */

/**
 * @type DayForecastViewFactory
 * @returns {DayForecastView}
 * @param {units} unit
 * @param {ForecastWeatherResponseDto} forecastWeatherResponseDto
 */
const dayForecastViewFactory = function (unit, forecastWeatherResponseDto) {
  /** @type ForecastWeatherResponseDto */
  let currentState = forecastWeatherResponseDto;

  const frag = document.createDocumentFragment();
  const datetime = document.createElement('span');
  const tempsDiv = document.createElement('div');
  const temperatureLarge = document.createElement('div');
  const weatherIcon = new Image();

  datetime.classList.add('day-forecast-section__date');
  tempsDiv.classList.add('day-forecast-section__temperature');
  temperatureLarge.classList.add(
    'day-forecast-section__temperature_large',
    'font_capital',
  );
  weatherIcon.classList.add('day-forecast-section__weather');

  const update = function () {
    tempsDiv.replaceChildren(
      TemperatureDataView(currentState.main, unit).render(),
    );
    weatherIcon.src = OpenWeatherIconURLBuilderService.getLargeIconSource(
      currentState.weather[0].icon,
    );
    temperatureLarge.textContent = formatTemperatureForUnit(
      currentState.main.temp,
      unit,
    );
  };

  const setState = function (
    /** @type {ForecastWeatherResponseDto} */ weatherInfo,
  ) {
    currentState = weatherInfo;
  };

  const render = function () {
    const article = document.createElement('article');
    article.append(weatherIcon, temperatureLarge, datetime, tempsDiv);
    article.classList.add('day-forecast-section__grid');

    datetime.textContent = format(
      new Date(currentState.dt * 1000),
      'eee, LLL do, bbb',
    );

    update();
    frag.appendChild(article);
    return frag;
  };

  const hide = function () {
    frag.replaceChildren();
  };
  return { render, update, setState, hide };
};

export { dayForecastViewFactory };
