import { Router } from 'express';

import * as validate from '@middlewares/request.validation';

import * as loginController from '@controllers/login.controller';

const route = Router();

route.post(
  '/',
  validate.loginRequiredFields,
  loginController.authLogin,
);

export default route;
