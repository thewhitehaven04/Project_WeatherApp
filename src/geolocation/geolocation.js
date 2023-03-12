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
  return {
    lat: await pr.coords.latitude,
    lon: await pr.coords.longitude,
  };
}

export { getLocalCoordinates };
