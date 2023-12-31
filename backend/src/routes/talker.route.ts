import { Router } from 'express';

import * as validate from '@middlewares/request.validation';

import * as talkerController from '@controllers/talker.controller';

const route = Router();

route.get(
  '/',
  validate.tokenRequired,
  validate.tokenAuthenticity,
  talkerController.getAllTalkers,
);

route.post(
  '/',
  validate.tokenRequired,
  validate.tokenAuthenticity,
  validate.talkerNameField,
  talkerController.createTalker,
);

route.put(
  '/:id',
  validate.tokenRequired,
  validate.tokenAuthenticity,
  validate.talkerParamsIdExists,
  validate.talkerNameField,
  talkerController.updateTalker,
);

route.delete(
  '/:id',
  validate.tokenRequired,
  validate.tokenAuthenticity,
  validate.talkerParamsIdExists,
  talkerController.deleteTalkerById,
);

export default route;
