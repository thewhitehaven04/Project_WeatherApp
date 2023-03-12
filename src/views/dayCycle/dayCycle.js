/** @typedef {View} DayCycleView */
/** @typedef {function(import("../../service/currentWeatherService").DayCycleDto): DayCycleView} DayCycleViewFactory */

import format from 'date-fns/format';
import {
  DurationIcon,
  SunriseIcon,
  SunsetIcon,
} from '../fontawesomeIcon/icon';
import { listItemWithIcon } from '../listItemWithIcon';

/**
 * @type {DayCycleViewFactory}
 */
const dayCycleViewFactory = function ({ sunrise, sunset, dayLength }) {
  const frag = document.createDocumentFragment();

  return {
    render: () => {
      const liSunrise = listItemWithIcon(
        SunriseIcon(),
        'Sunrise: %value%',
        format(sunrise, 'HH:mm'),
      );
      const liSunset = listItemWithIcon(
        SunsetIcon(),
        'Sunset: %value%',
        format(sunset, 'HH:mm'),
      );
      const liDuration = listItemWithIcon(
        DurationIcon(),
        'Day duration: %value%',
        format(new Date(dayLength), 'HH:mm'),
      );

      frag.append(liSunrise, liSunset, liDuration);
      return frag;
    },
  };
};

export { dayCycleViewFactory };
