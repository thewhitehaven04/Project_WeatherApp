import { EventBus } from '../../event/eventBus';
import { loadingComponentFactory } from '../../views/loading/loading';

const MainComponent = (() => {
  const frag = document.createDocumentFragment();
  const mainSection = document.createElement('main');

  function render() {
    mainSection.classList.add('main-section-component', 'main');
    frag.appendChild(mainSection);
    return frag;
  }

  /**
   * Displays the new tab (DocumentFragment) in the main section of the application.
   * @param {DocumentFragment} fragment
   */
  function displayTab(fragment) {
    mainSection.replaceChildren();
    mainSection.append(fragment);
  }

  return { render, displayTab };
})();

export { MainComponent };
