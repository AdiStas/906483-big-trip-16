const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get eventPoints() {
    return this.#load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  updateEventPoint = async (eventPoint) => {
    const response = await this.#load({
      url: `points/${eventPoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(eventPoint)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  #adaptToServer = (eventPoint) => {
    const adaptedEventPoint = {...eventPoint,
      'date_from': eventPoint.dateFrom.toISOString(),
      'date_to': eventPoint.dateFrom.toISOString(),
      'base_price': eventPoint.price,
      'is_favorite': eventPoint.isFavorite,
    };

    delete adaptedEventPoint.dateFrom;
    delete adaptedEventPoint.dateTo;
    delete adaptedEventPoint.price;
    delete adaptedEventPoint.isFavorite;

    return adaptedEventPoint;
  }


  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}
