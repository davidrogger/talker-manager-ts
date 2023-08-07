import * as talkerService from '@src/services/talker.service';
import * as idService from '@src/services/id.service';
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

route.post(
  '/',
  validate.tokenRequired,
  validate.tokenAuthenticity,
  validate.talkerNameField,
  validate.talkerAgeField,
  async (req, res, next) => {
    const newTalker = req.body;
    try {
      const id = idService.generateId();
      const talker = { id, ...newTalker };
      await talkerService.createTalker(talker);
      res.status(201).json({ talker });
    } catch (error) {
      next(error);
    }
  },
);

export default route;
