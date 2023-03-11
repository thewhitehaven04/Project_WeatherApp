import { format } from 'date-fns';
import { units } from '../../dto/openweather/enums';
import { TemperatureDataView } from '../temperature/temperature';
import { WindView } from '../wind/wind';
import style from './dayForecastView.css';

/** @typedef {function(units, ForecastWeatherResponseDto): UpdatableView<ForecastWeatherResponseDto>} DayForecastViewFactory */
/** @typedef {UpdatableView<ForecastWeatherResponseDto>} DayForecastView */

/**
 * @type DayForecastViewFactory
 * @constructs DayForecastView
 * @param {units} unit
 * @param {ForecastWeatherResponseDto} forecastWeatherResponseDto
 */
const dayForecastViewFactory = function (unit, forecastWeatherResponseDto) {
  /** @type ForecastWeatherResponseDto */
  let currentState = forecastWeatherResponseDto;

  const frag = document.createDocumentFragment();
  const datetime = document.createElement('span');
  const tempsDiv = document.createElement('div');
  const windsDiv = document.createElement('div');

  datetime.classList.add('day-forecast-section__date');
  tempsDiv.classList.add('day-forecast-section__temperature');
  windsDiv.classList.add('day-forecast-section__wind');

  const update = function () {
    tempsDiv.replaceChildren(
      TemperatureDataView(currentState.main, unit).render(),
    );
    windsDiv.replaceChildren(WindView(currentState.wind, unit).render());
  };

  const setState = function (
    /** @type {ForecastWeatherResponseDto} */ weatherInfo,
  ) {
    currentState = weatherInfo;
  };

  const render = function () {
    const article = document.createElement('article');
    article.append(datetime, tempsDiv, windsDiv);
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
