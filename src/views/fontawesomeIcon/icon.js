import style from './icon.css';
/**
 * Generic icon type.
 * @typedef Icon
 * @property {function():HTMLElement} render
 */

/**
 * A helper function that renders FontAwesome icons
 * @typedef {function(string[]):HTMLElement}
 * @param {string[]} classTokens list of FontAwesome classes
 * @returns {Icon}
 */
const FontAwesomeIconFactory = function (...classTokens) {
  return {
    render: () => {
      const icon = document.createElement('i');
      icon.classList.add(...classTokens, 'font-awesome-icon');
      return icon;
    },
  };
};

const TemperatureLowIcon = () =>
  FontAwesomeIconFactory('fa-solid', 'fa-temperature-low');

const TemperatureHighIcon = () =>
  FontAwesomeIconFactory('fa-solid', 'fa-temperature-high');

const CurrentTemperatureIcon = () =>
  FontAwesomeIconFactory('fa-solid', 'fa-temperature-half');

const FeelsLikeIcon = () =>
  FontAwesomeIconFactory('fa-solid', 'fa-temperature-empty');

const DirectionIcon = () => FontAwesomeIconFactory('fa-regular', 'fa-compass');

const GustIcon = () => FontAwesomeIconFactory('fa-solid', 'fa-wind');

const SpeedIcon = () => FontAwesomeIconFactory('fa-solid', 'fa-gauge');

const SunriseIcon = () => FontAwesomeIconFactory('fa-solid', 'fa-sun');

const SunsetIcon = () => FontAwesomeIconFactory('fa-regular', 'fa-sun');

const DurationIcon = () => FontAwesomeIconFactory('fa-regular', 'fa-clock');

export {
  TemperatureLowIcon,
  TemperatureHighIcon,
  CurrentTemperatureIcon,
  FeelsLikeIcon,
  DirectionIcon,
  GustIcon,
  SpeedIcon,
  SunriseIcon,
  SunsetIcon,
  DurationIcon
};
