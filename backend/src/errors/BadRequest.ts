import HttpError from './HttpError';

export default class BadRequest extends HttpError {
  name = 'BadRequest';

  status = 400;
}
