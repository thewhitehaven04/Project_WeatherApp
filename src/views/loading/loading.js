import { SpinnerIcon } from '../fontawesomeIcon/icon';
import style from './loading.css';
/**
 * @typedef LoadingComponent
 * @property {function():void} show
 * @property {function():void} hide
 */

/**
 * Renders a loading wheel.
 * @returns {LoadingComponent}
 * @param {HTMLElement} root
 */
const loadingComponentFactory = function (root) {
  const spinner = document.createElement('div');
  spinner.appendChild(SpinnerIcon().render());

  return {
    show: function () {
      root.appendChild(spinner);
      root.classList.add('overlay');
      spinner.classList.add('spinner');
    },
    hide: function () {
      root.removeChild(spinner);
      root.classList.remove('overlay');
      spinner.classList.remove('spinner');
    },
  };
};

export { loadingComponentFactory };
