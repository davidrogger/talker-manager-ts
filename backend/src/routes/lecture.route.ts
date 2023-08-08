import { Router } from 'express';

import * as validation from '@middlewares/request.validation';

import * as lectureController from '@controllers/lecture.controller';

const route = Router();

route.get('/', lectureController.getAllLectures);

route.post(
  '/',
  validation.tokenRequired,
  validation.tokenAuthenticity,
  validation.lectureTalkerNameField,
  validation.lectureTitleField,
  validation.lectureWatchedAtField,
  lectureController.createLecture,
);

export default route;
