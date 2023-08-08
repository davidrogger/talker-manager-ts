import { Router } from 'express';

import * as validate from '@middlewares/request.validation';

import * as userController from '@controllers/user.controller';

const route = Router();

route.get(
  '/',
  validate.tokenRequired,
  userController.getUserData,
);

export default route;
