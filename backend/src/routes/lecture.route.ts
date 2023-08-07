import * as lectureService from '@src/services/lecture.service';
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

export default route;
