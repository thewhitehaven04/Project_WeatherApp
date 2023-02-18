import { formLocationQuery } from '../../utils/clientUtils';
import { OpenWeatherClient } from './openweather';

class DirectGeocodingClient extends OpenWeatherClient {
  constructor(rootUrl) {
    super(rootUrl + 'geo/1.0/');
  }

  /**
   * @param {LocationDto} locationDto
   * @param {Number} limit
   */
  async getDirect(locationDto, limit) {
    return await (
      await this.get('direct', { q: formLocationQuery(locationDto), limit })
    ).json();
  }
}

export { DirectGeocodingClient };
