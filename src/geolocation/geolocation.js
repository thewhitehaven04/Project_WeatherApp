/**
 * Return user's current coordinates.
 * @return {Promise<Coordinates>}
 */
async function getLocalCoordinates() {
  const pr = await new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (value) => resolve(value),
      (err) => reject(err),
    ),
  );
  const coords = await pr.coords;
  return {
    lat: coords.latitude,
    lon: coords.longitude
  };
}

export { getLocalCoordinates };
