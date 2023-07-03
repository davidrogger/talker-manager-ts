import HttpError from '.';

export default class Conflic extends HttpError {
  name = 'Conflict';

  status = 409;
}
