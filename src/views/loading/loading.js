import style from './loading.css';
/**
 * @typedef {{
 * show: {function(): void},
 * hide: {function(): void}
 * }} LoadingComponent
 */

/**
 * Renders a loading wheel.
 * @constructs LoadingComponent
 * @param {HTMLElement} root
 */
const loadingComponentFactory = function (root) {
  const show = () => root.classList.add('loading');
  const hide = () => root.classList.remove('loading');
  return { show, hide };
};

export { loadingComponentFactory };
