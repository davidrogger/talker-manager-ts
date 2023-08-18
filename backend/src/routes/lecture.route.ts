import { Router } from 'express';

import * as validate from '@middlewares/request.validation';
import * as lectureController from '@controllers/lecture.controller';

const route = Router();

route.get('/', lectureController.getAllLectures);

route.post(
  '/',
  validate.tokenRequired,
  validate.tokenAuthenticity,
  validate.talkerBodyIdExists,
  validate.lectureTitleField,
  validate.lectureWatchedAtField,
  lectureController.createLecture,
);

route.put(
  '/:id',
  validate.tokenRequired,
  validate.tokenAuthenticity,
  validate.lectureIdExists,
  validate.talkerBodyIdExists,
  validate.lectureTitleField,
  validate.lectureWatchedAtField,
);

export default route;
