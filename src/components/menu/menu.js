// @ts-ignore
import style from './menu.css';
/**
 * @typedef {Object} MenuEntry
 * @property {String} displayName displayed name of the menu tab
 * @property {Function} callback callback function to call upon
 */

/**
 * @typedef {View} Menu
 */

/**
 * @returns {Menu}
 * @param {Array<MenuEntry>} menuEntries
 */
const menuFactory = function (menuEntries) {
  const frag = document.createDocumentFragment();
  const ul = document.createElement('ul');

  const render = function () {
    const lis = menuEntries.map((menuEntry) => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.textContent = menuEntry.displayName;
      button.addEventListener('click', () => {
        menuEntry.callback();
      });
      li.appendChild(button);
      return li;
    });
    ul.classList.add('menu-flex');
    ul.append(...lis);
    frag.append(ul);
    return frag;
  };

  return {
    render,
  };
};

export { menuFactory };
