import type { CreateLecture, UpdateLecture } from '@types';

import * as lectureModel from '@models/lecture.model';
import BadRequest from '@src/errors/BadRequest';

export async function getAllLectures() {
  return lectureModel.getAllLectures();
}

export async function createLecture(lecture:CreateLecture & { id: string }):Promise<string> {
  await lectureModel.createLecture(lecture);
  return 'Lecture recorded with success';
}

export async function findLectureById(id:string) {
  const lectureFound = await lectureModel.findLectureById(id);
  if (!lectureFound) throw new BadRequest('Lecture not found');
  return lectureFound;
}

export async function updateLectureById(id:string, updatedLecture:UpdateLecture) {
  await lectureModel.updateLectureById(id, updatedLecture);
}
