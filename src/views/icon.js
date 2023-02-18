/**
 * A helper function that renders FontAwesome icons
 * @typedef {function(string[]):HTMLElement}
 * @param {string[]} classTokens list of FontAwesome classes
 */
const FontAwesomeIconFactory = function (...classTokens) {
  return {
    render: () => {
      const icon = document.createElement('icon');
      icon.classList.add(...classTokens);
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

export { TemperatureLowIcon, TemperatureHighIcon, CurrentTemperatureIcon };
