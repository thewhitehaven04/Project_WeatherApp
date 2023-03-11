import { units } from '../../dto/openweather/enums';
import {
  CurrentTemperatureIcon,
  FeelsLikeIcon,
  TemperatureHighIcon,
  TemperatureLowIcon,
} from '../fontawesomeIcon/icon';

/**
 * Format temperature output depending on the unit.
 * @param {Number} temp
 * @param {units} unit
 * @returns
 */
const formatTemperatureForUnit = (temp, unit) => {
  const singleDigitTemp = temp.toFixed(1);
  if (unit === units.STANDARD) {
    return `${singleDigitTemp} K`;
  } else if (unit === units.METRIC) {
    return `${singleDigitTemp}° C`;
  }
  return `${singleDigitTemp}° F`;
};

/**
 * @param {Number} temperature
 * @param {units} unit
 * @returns {HTMLSpanElement}
 */
const averageTemp = (temperature, unit) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = `Avg temp: ${formatTemperatureForUnit(
    temperature,
    unit,
  )}`;
  li.append(CurrentTemperatureIcon().render(), span);
  return li;
};

/**
 * @param {Number} temperature
 * @param {units} unit
 * @returns {HTMLSpanElement}
 */
const minTemp = (temperature, unit) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = `Min temp: ${formatTemperatureForUnit(
    temperature,
    unit,
  )}`;
  li.append(TemperatureLowIcon().render(), span);
  return li;
};

/**
 * @param {Number} temperature
 * @param {units} unit
 * @returns {HTMLSpanElement}
 */
const maxTemp = (temperature, unit) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = `Max temp: ${formatTemperatureForUnit(
    temperature,
    unit,
  )}`;
  li.append(TemperatureHighIcon().render(), span);
  return li;
};

/**
 * @param {Number} temperature
 * @param {units} unit
 * @returns {HTMLLIElement}
 */
const feelsLike = (temperature, unit) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = `Feels like: ${formatTemperatureForUnit(
    temperature,
    unit,
  )}`;
  li.append(FeelsLikeIcon().render(), span);
  return li;
};

/**
 * @typedef {function(MainDto, units): View}
 * @param {MainDto} mainDto
 * @param {units} unit
 */
const TemperatureDataView = function (
  { temp, temp_max, temp_min, feels_like },
  unit,
) {
  /** @type {function(MainDto, units):HTMLElement} */
  return {
    render: () => {
      const div = document.createElement('div');
      div.classList.add('temperature-widget');

      const ul = document.createElement('ul');
      ul.append(
        ...[
          minTemp(temp_min, unit),
          maxTemp(temp_max, unit),
          feelsLike(feels_like, unit),
        ],
      );
      div.append(ul);
      return div;
    },
  };
};

export { TemperatureDataView, formatTemperatureForUnit };
