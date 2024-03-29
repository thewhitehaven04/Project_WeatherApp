import style from './fiveDayForecastView.css';

/**
 * @typedef {UpdatableView<import('../../service/forecastService').ForecastInfoDto>} FiveDayForecastView
 */

/**
 * @typedef {function(import('../../service/forecastService').ForecastInfoDto, Function): FiveDayForecastView} FiveDayForecastViewFactory
 */

import { app } from '../../app';
import { LastUpdatedView } from '../lastUpdated/lastUpdated';
import { loadingComponentFactory } from '../loading/loading';
import { dayForecastViewFactory } from './dayForecastView';

/**
 * @param {import('../../service/forecastService').ForecastInfoDto} fivedayForecastState
 * @param {function(): void} refreshWeatherDataCallback
 * @constructs FiveDayForecastView
 */
const fiveDayForecastViewFactory = function (
  fivedayForecastState,
  refreshWeatherDataCallback,
) {
  /** @type {import('../../service/forecastService').ForecastInfoDto} */
  let state = fivedayForecastState;
  let children = state.list.map((forecastWeatherResponseDto) =>
    dayForecastViewFactory(app.unit, forecastWeatherResponseDto),
  );

  const frag = document.createDocumentFragment();
  const lastUpdated = document.createElement('div');

  /** @param {import('../../service/forecastService').ForecastInfoDto} dayForecastViewStates */
  const setState = (dayForecastViewStates) => {
    state = dayForecastViewStates;
  };

  const update = () => {
    children.forEach((dayForecastView, index) => {
      dayForecastView.setState(state.list[index]);
      dayForecastView.update();
    });
    lastUpdated.replaceChildren(LastUpdatedView(state.lastUpdated).render());
  };

  const render = function () {
    const refreshButton = document.createElement('button');
    const section = document.createElement('section');
    update();

    refreshButton.textContent = 'Update';
    refreshButton.addEventListener('click', () => {
      refreshWeatherDataCallback();
    });

    const divSections = document.createElement('div');
    divSections.classList.add('forecast__grid');
    divSections.append(...children.map((child) => child.render()));

    const bottom = document.createElement('div');
    bottom.classList.add('fiveday-forecast-section__bottom');
    bottom.append(refreshButton, lastUpdated);

    section.replaceChildren(divSections, bottom);
    frag.appendChild(section);
    return frag;
  };

  const hide = function () {
    frag.replaceChildren();
  };

  return { render, hide, setState, update };
};

export { fiveDayForecastViewFactory };
