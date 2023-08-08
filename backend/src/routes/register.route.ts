import { Router } from 'express';

import * as validate from '@middlewares/request.validation';

import * as userController from '@controllers/user.controller';

const route = Router();

route.post(
  '/',
  validate.newUserRequiredFields,
  validate.emailFormat,
  validate.passwordFormat,
  validate.emailUnique,
  userController.createUser,
);

export default route;
