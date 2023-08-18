import type { CreateLecture } from '@types';

import * as lectureModel from '@models/lecture.model';

export async function getAllLectures() {
  return lectureModel.getAllLectures();
}

export async function createLecture(lecture:CreateLecture):Promise<string> {
  await lectureModel.createLecture(lecture);
  return 'Lecture recorded with success';
}
