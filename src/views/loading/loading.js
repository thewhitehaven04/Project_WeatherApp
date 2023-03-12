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
  const absolutePosDiv = document.createElement('div');
  absolutePosDiv.classList.add('absolute-pos');

  return {
    show: function () {
      absolutePosDiv.classList.add('loading');
      root.appendChild(absolutePosDiv);
    },
    hide: function () {
      absolutePosDiv.classList.remove('loading');
      root.removeChild(absolutePosDiv);
    },
  };
};

export { loadingComponentFactory };
