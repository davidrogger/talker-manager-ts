import * as lectureService from '@src/services/lecture.service';
import * as validation from '@src/middlwares/request.validation';
import { Router } from '.';

const route = Router();

route.get('/', async (_req, res, next) => {
  try {
    const lectures = await lectureService.getAllLectures();
    res.status(200).json({ lectures });
  } catch (error) {
    next(error);
  }
});

route.post(
  '/',
  validation.tokenRequired,
  validation.tokenAuthenticity,
  async (req, res, next) => {
    try {
      const lecture = req.body;
      res.status(201).json({ lecture });
    } catch (error) {
      next(error);
    }
  },
);

export default route;
