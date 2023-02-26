/**
 * Returns a list item with given icon.
 * @param {import("./fontawesomeIcon/icon").Icon} icon
 * @param {String} pattern
 * @param {Object} value
 */
const listItemWithIcon = function (icon, pattern, value) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  pattern.replace('%value', value);
  span.innerText = pattern;
  li.append(icon.render(), span);
  return li;
};

export { listItemWithIcon };
