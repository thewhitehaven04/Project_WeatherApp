import { EventBus } from '../../event/eventBus';
import { loadingComponentFactory } from '../../views/loading/loading';


// this is a big fucking mess of a code
const MainComponent =
  /** @returns {View} */
  (() => {
    const frag = document.createDocumentFragment();
    const mainSection = document.createElement('main');
    mainSection.classList.add('main');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const loadingComponent = loadingComponentFactory(overlay);

    EventBus.subscribe('requestShowLoading', loadingComponent.show);
    EventBus.subscribe('requestStopLoading', loadingComponent.hide);

    function render() {
      mainSection.classList.add('main-section-component');
      overlay.appendChild(mainSection);
      frag.appendChild(overlay);
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
