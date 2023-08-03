import * as talkerService from '@src/services/talker.service';
import { validate } from '@src/middlwares';
import { Router } from '.';

const route = Router();

route.get(
  '/',
  validate.tokenRequired,
  validate.tokenAuthenticity,
  async (_req, res, next) => {
    try {
      const talkers = await talkerService.getAllTalkers();
      res.status(200).json({ talkers });
    } catch (error) {
      next(error);
    }
  },
);

export default route;