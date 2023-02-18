/**
 * @param  {Object[]} params 
 * @returns {String} stringified query parameters 
 */
const stringifyQueryParameters = function (...params) {
  let accumObj = [];
  params.forEach((param) => {accumObj.push(Object.entries(param))})
  return new URLSearchParams(Object.fromEntries(accumObj.flat())).toString();
}


/**
 * @param {LocationDto} locationDto 
*/
const formLocationQuery = function (locationDto) {
  return `${locationDto.cityName},${locationDto.stateCode},${locationDto.countryCode}`
}

export { stringifyQueryParameters, formLocationQuery };