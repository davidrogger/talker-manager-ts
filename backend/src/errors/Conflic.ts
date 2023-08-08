import HttpError from './HttpError';

export default class Conflic extends HttpError {
  name = 'Conflict';

  status = 409;
}
