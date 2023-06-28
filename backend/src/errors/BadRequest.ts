import HttpError from '.';

export default class BadRequest extends HttpError {
  name = 'BadRequest';

  status = 400;
}
