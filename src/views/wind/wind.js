import { units } from '../../dto/openweather/requestEnums';
import { DirectionIcon, GustIcon, SpeedIcon } from '../fontawesomeIcon/icon';
import { listItemWithIcon } from '../listItemWithIcon';

/**
 * Format speed for given measurement unit
 * @param {Number} speed
 * @param {units} unit
 */
const _formatSpeedForUnit = function (speed, unit) {
  if (unit === units.IMPERIAL) {
    return `${speed} mph`;
  }
  return `${speed} m/s`;
};

const gustItem = function (gust, unit) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = `Gust speed: ${_formatSpeedForUnit(gust, unit)}`;
  li.append(GustIcon().render(), span);
  return li;
};

const speedItem = function (speed, unit) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = `Wind speed: ${_formatSpeedForUnit(speed, unit)}`;
  li.append(SpeedIcon().render(), span);
  return li;
};

/**
 * Renders wind data.
 * @param {WindDto} wind
 * @param {units} unit
 * @returns {View}
 */
const WindView = function ({ deg, gust, speed }, unit) {
  const frag = document.createDocumentFragment();

  return {
    render: () => {
      const ul = document.createElement('ul');
      const degItem = listItemWithIcon(
        DirectionIcon(),
        'Direction: %value%°',
        deg,
      );

      ul.append(gustItem(gust, unit), speedItem(speed, unit), degItem);

      frag.appendChild(ul);
      return frag;
    },
  };
};

export { WindView };
