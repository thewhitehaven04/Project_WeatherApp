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
  /**
   * @constructs LoadingComponent
   */
  return {
    show: function () {
      root.classList.add('loading');
    },
    hide: function () {
      root.classList.remove('loading');
    },
  };
};

export { loadingComponentFactory };
