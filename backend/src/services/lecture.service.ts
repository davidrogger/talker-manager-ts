import type { ILecture } from '@types';
import * as lectureModel from '@src/models/lecture.model';

export async function getAllLectures() {
  return lectureModel.getAllLectures();
}

export async function createLecture(lecture:ILecture):Promise<string> {
  await lectureModel.createLecture(lecture);
  return 'Lecture recorded with success';
}
