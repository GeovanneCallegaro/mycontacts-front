class APIError extends Error {
  constructor(response, body) {
    super();

    this.name = 'API Error';
    this.response = response;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}

export default APIError;
