const EventBus = (() => {
  /**
   * @type {Map<String, Function[]>}
   */
  const observers = new Map();

  /**
   * Add a bound callback function to the observer list.
   * @param {String} eventName
   * @param {Function} cb
   */
  const subscribe = function (eventName, cb) {
    if (!observers.has(eventName)) {
      observers.set(eventName, []);
    }
    observers.get(eventName).push(cb);
  };

  /**
   * Execute registered callbacks for the given event.
   * @param {String} eventName
   * @param {Object} data
   */
  const notify = function (eventName, data) {
    if (observers.get(eventName)) {
      observers.get(eventName).forEach((cb) => cb(data));
    }
  };

  return { subscribe, notify };
})();

export { EventBus };
