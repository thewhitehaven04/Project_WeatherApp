/**
 * @param  {Object[]} params 
 * @returns {String} stringified query parameters 
 */
const stringifyQueryParameters = function (...params) {
  let accumObj = [];
  params.forEach((param) => {accumObj.push(Object.entries(param))})
  return new URLSearchParams(Object.fromEntries(accumObj.flat())).toString();
}

export { stringifyQueryParameters };