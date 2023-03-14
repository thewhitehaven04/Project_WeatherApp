import { EventBus } from '../../event/eventBus';
import { loadingComponentFactory } from '../../views/loading/loading';


// this is a big fucking mess of a code
const MainComponent =
  /** @returns {View} */
  (() => {
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
