import type {
  CreateLecture, ILecture, RowLectures, UpdateLecture,
} from '@types';
import type { RowDataPacket } from 'mysql2';

import connection from '@models/connection.model';

export async function getAllLectures():Promise<RowLectures[]> {
  const query = `
    SELECT lecture.id, talker.id as talkerId, talker.name as talkerName, lecture.title, lecture.watched_at as watchedAt
    FROM lecture
    INNER JOIN talker
    ON talker.id = lecture.talker_id;`;

  const [lectures] = await connection.execute<RowLectures[]>(query);

  return lectures;
}

export async function createLecture({
  id, talkerId, title, watchedAt,
}:CreateLecture & { id:string }): Promise<void> {
  const query = 'INSERT INTO lecture(id, talker_id, title, watched_at) VALUES (?, ?, ?, ?)';
  await connection.execute(query, [id, talkerId, title, watchedAt]);
}

export async function findLectureById(id:string) {
  const query = 'SELECT * FROM lecture WHERE id = ?';
  const [rows] = await connection.execute<RowDataPacket[]>(query, [id]);
  const [lecture] = rows as ILecture[];
  return lecture;
}

export async function updateLectureById(id:string, { talkerId, title, watchedAt }:UpdateLecture) {
  const query = 'UPDATE lecture SET talker_id = ?, title = ?, watched_at = ? WHERE id = ?';
  await connection.execute(query, [talkerId, title, watchedAt, id]);
}

export async function deleteLectureById(id:string) {
  const query = 'DELETE FROM lecture WHERE id = ?';
  await connection.execute(query, [id]);
}
