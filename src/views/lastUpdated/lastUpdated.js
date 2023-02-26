import format from 'date-fns/format';

/**
 * Returns the span element containing the time of latest request.
 * @param {Date} lastUpdated
 * @returns {View}
 */
function LastUpdatedView(lastUpdated) {
  const frag = document.createDocumentFragment();

  return {
    render: () => {
      const span = document.createElement('span');
      span.innerHTML = `Last updated: ${format(
        lastUpdated,
        'hh:mm:ss do MMMM yyyy',
      )}`;
      frag.appendChild(span);
      return frag;
    },
    hide: () => {
      frag.replaceChildren();
    },
  };
}

export { LastUpdatedView };
