import { units } from '../../dto/openweather/requestEnums';
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
const _formatTemperatureForUnit = (temp, unit) => {
  if (unit === units.STANDARD) {
    return `${temp} K`;
  } else if (unit === units.METRIC) {
    return `${temp}° C`;
  }
  return `${temp}° F`;
};

/**
 * @param {Number} temperature
 * @param {units} unit
 * @returns {HTMLSpanElement}
 */
const currentTemp = (temperature, unit) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = `Current tempeature: ${_formatTemperatureForUnit(
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
  span.textContent = `Minimal temperature: ${_formatTemperatureForUnit(
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
  span.textContent = `Maximum temperature: ${_formatTemperatureForUnit(
    temperature,
    unit,
  )}`;
  li.append(TemperatureHighIcon().render(), span);
  return li;
};

const feelsLike = (temperature, unit) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = `Feels like: ${_formatTemperatureForUnit(
    temperature,
    unit,
  )}`;
  li.appendChild(FeelsLikeIcon().render(), span);
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
          currentTemp(temp, unit),
          minTemp(temp_min, unit),
          maxTemp(temp_max, unit),
        ],
      );

      div.append(ul, feelsLike(feels_like, unit));
      return div;
    },
  };
};

export { TemperatureDataView };
