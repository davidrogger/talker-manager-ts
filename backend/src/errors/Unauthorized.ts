import HttpError from '.';

export default class Unauthorized extends HttpError {
  name = 'Unauthorized';

  status = 401;

  constructor() {
    super('Unauthorized Access');
  }
}
