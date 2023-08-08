import { Router } from 'express';

import * as validate from '@middlewares/request.validation';
import { jwtService, userService, encryptService } from '../services';

const route = Router();

route.post(
  '/',
  validate.newUserRequiredFields,
  validate.emailFormat,
  validate.passwordFormat,
  validate.emailUnique,
  async (req, res, next) => {
    const registerInput = req.body;
    try {
      const encryptedPassword = await encryptService.encryptPassword(registerInput.password);
      const user = await userService.createUser({ ...registerInput, password: encryptedPassword });
      const token = await jwtService.tokenGenerator(user);
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  },
);

export default route;
