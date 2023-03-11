export const zip = (a, b) => {
  return a.map((aVal, index) => [aVal, b[index]]);
};
