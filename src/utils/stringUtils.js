export const stringFactory = (pattern) => {
  (values) => {
    let entries = Object.entries(values);
    return entries.reduce(
      (accumulator, currentValue) =>
        accumulator.replace('{' + currentValue[0] + '}', currentValue[1]),
      pattern,
    );
  };
};