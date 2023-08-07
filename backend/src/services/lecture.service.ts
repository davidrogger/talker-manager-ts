import * as lectureModel from '@src/models/lecture.model';

export async function getAllLectures() {
  return lectureModel.getAllLectures();
}
