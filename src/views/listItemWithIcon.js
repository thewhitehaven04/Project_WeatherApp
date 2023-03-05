/**
 * Returns a list item with given icon.
 * @param {import("./fontawesomeIcon/icon").Icon} icon
 * @param {String} pattern
 * @param {Object} value
 */
const listItemWithIcon = function (icon, pattern, value) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerText = pattern.replace('%value%', value);
  li.append(icon.render(), span);
  return li;
};

export { listItemWithIcon };
