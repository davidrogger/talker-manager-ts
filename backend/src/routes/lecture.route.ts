import { Router } from 'express';

import * as lectureService from '@services/lecture.service';
import * as idService from '@services/id.service';
import * as validation from '@middlewares/request.validation';

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
  validation.lectureTalkerNameField,
  validation.lectureTitleField,
  validation.lectureWatchedAtField,
  async (req, res, next) => {
    const newLecture = req.body;
    try {
      const id = idService.generateId();
      const lecture = { id, ...newLecture };
      const message = await lectureService.createLecture(lecture);

      res.status(201).json({ message });
    } catch (error) {
      next(error);
    }
  },
);

export default route;
