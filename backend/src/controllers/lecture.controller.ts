import type { Request, Response, NextFunction } from 'express';

import * as idService from '@services/id.service';
import * as lectureService from '@services/lecture.service';

export async function getAllLectures(req:Request, res:Response, next:NextFunction) {
  try {
    const lectures = await lectureService.getAllLectures();
    res.status(200).json({ lectures });
  } catch (error) {
    next(error);
  }
}

export async function createLecture(req:Request, res:Response, next:NextFunction) {
  const newLecture = req.body;
  try {
    const id = idService.generateId();
    const lecture = { id, ...newLecture };
    const message = await lectureService.createLecture(lecture);

    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
}

export async function updateLecture(req:Request, res:Response, next:NextFunction) {
  const updatedLecture = req.body;
  const idLectures = req.params.id;
  try {
    await lectureService.updateLectureById(idLectures, updatedLecture);
    res.status(200).json({ message: 'Updated Successfully Completed' });
  } catch (error) {
    next(error);
  }
}
