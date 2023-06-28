import HttpError from '.';

export default class Unauthorized extends HttpError {
  name = 'Unauthorized';

  status = 409;

  constructor() {
    super('Unauthorized Access');
  }
}
