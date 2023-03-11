import { urls } from '../config/config';

/**
 * @typedef IconService
 * @property {function(String):String} getIconSource returns a link to an icon
 * @property {function(String):String} getLargeIconSource returns a link to a large icon
 */

/**
 * @type IconService
 */
const OpenWeatherIconURLBuilderService = (function () {
  const getIconSource = (iconCode) =>
    `${urls.openWeatherIconApi}img/wn/${iconCode}@2x.png`;

  const getLargeIconSource = (iconCode) =>
    `${urls.openWeatherIconApi}img/wn/${iconCode}@4x.png`;

  return { getIconSource, getLargeIconSource };
})();

export { OpenWeatherIconURLBuilderService };
