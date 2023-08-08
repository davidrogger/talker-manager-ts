import { Router } from 'express';

import * as validate from '@middlewares/request.validation';

import * as meController from '@controllers/me.controller';

const route = Router();

route.get(
  '/',
  validate.tokenRequired,
  meController.getUserData,
);

export default route;
