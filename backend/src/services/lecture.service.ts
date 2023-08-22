import type {
  CreateLecture, ILecture, RowLectures, UpdateLecture,
} from '@types';

import * as lectureModel from '@models/lecture.model';
import BadRequest from '@src/errors/BadRequest';

function normilizeLectures(rowLectures:RowLectures[]) {
  return rowLectures.map(({
    id, title, watchedAt, talkerId, talkerName,
  }) => ({
    id,
    title,
    watchedAt,
    talker: {
      id: talkerId,
      name: talkerName,
    },
  } as ILecture));
}

export async function getAllLectures() {
  const rawLectures = await lectureModel.getAllLectures();
  const lectures = normilizeLectures(rawLectures);
  return lectures;
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

export async function deleteLectureById(id:string) {
  await lectureModel.deleteLectureById(id);
}
