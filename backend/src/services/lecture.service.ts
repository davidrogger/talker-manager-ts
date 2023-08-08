import * as lectureModel from '@src/models/lecture.model';
import { ILecture } from '@src/types';

export async function getAllLectures() {
  return lectureModel.getAllLectures();
}

export async function createLecture(lecture:ILecture):Promise<string> {
  await lectureModel.createLecture(lecture);
  return 'Lecture recorded with success';
}
