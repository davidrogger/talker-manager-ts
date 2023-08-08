import * as validate from '@src/middlwares/request.validation';
import { Router } from '.';
import { jwtService } from '../services';

const route = Router();

route.get(
  '/',
  validate.tokenRequired,
  async (req, res, next) => {
    const { authorization } = req.headers;
    try {
      const user = jwtService.verifyToken(authorization as string);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  },
);

export default route;
