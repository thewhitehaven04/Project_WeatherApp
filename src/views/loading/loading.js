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
    const fragment = document.createDocumentFragment();
    const overlay = document.createElement('div');
    overlay.classList.add('loading');
    overlay.appendChild(overlay);
    return fragment;
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
