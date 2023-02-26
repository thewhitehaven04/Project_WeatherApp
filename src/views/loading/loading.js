/**
 * @typedef {{show: function(): void, hide: function(): void}} LoadingComponent
 */

/**
 * Renders a loading wheel.
 * @returns {LoadingComponent}
 * @param {HTMLElement} root
 */
const loadingComponent = function (root) {
  let rendered;

  const render = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('loading');
    return overlay;
  };
  return {
    show: () => {
      rendered = render();
      root.appendChild(rendered);
    },
    hide: () => {
      root.removeChild(rendered);
    },
  };
};

export { loadingComponent };
