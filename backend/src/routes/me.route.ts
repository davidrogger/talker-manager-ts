import { Router } from 'express';

import * as validate from '@middlewares/request.validation';
import * as jwtService from '@services/jwt.service';

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
