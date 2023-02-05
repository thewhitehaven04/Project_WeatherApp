import { apiKeys } from '../../config/config';
import { stringifyQueryParameters } from '../clientUtils';

/** Base class for OpenWeather API client
 * @class OpenWeatherClient
 */
class OpenWeatherClient {
  /**
   * @param {String} rootUrl root URL of OpenWeather API
   */
  constructor(rootUrl) {
    this.rootUrl = rootUrl;
    this.apiKey = apiKeys.openWeather;
  }

  /** Perform a request to OpenWeather API
   * @param {String} relativeUrl request's relative url
   * @param {String} method request method
   * @param {Object} params request's query parameters
   */
  async request(relativeUrl, method, { params, body } = { undefined }) {
    const urlSearchParams = stringifyQueryParameters(params, {
      appid: this.apiKey,
    });

    console.dir(urlSearchParams);
    return await fetch(`${this.rootUrl}/${relativeUrl}?${urlSearchParams}`, {
      method: method,
      body: JSON.stringify(body),
    });
  }

  /** Perform a GET-request to OpenWeather API.
   * @param {String} relativeUrl GET-request's relative url
   * @param {Object} params GET-request's query parameters
   */
  async get(relativeUrl, params) {
    return await this.request(relativeUrl, 'GET', { params });
  }
}

export { OpenWeatherClient };
