import type {
  CreateLecture, ILecture, RawLecture, UpdateLecture,
} from '@types';
import type { RowDataPacket } from 'mysql2';

import connection from '@models/connection.model';

function normalizeLecture(rows: RowDataPacket[]):ILecture[] {
  const lectures: ILecture[] = rows.map(({
    id, talkerName, title, watched_at,
  }) => ({
    id,
    talkerName,
    title,
    watchedAt: watched_at,
  }));

  return lectures;
}

export async function getAllLectures() {
  const query = `
    SELECT lecture.id, talker.name as talkerName, lecture.title, lecture.watched_at
    FROM lecture
    INNER JOIN talker
    ON talker.id = lecture.talker_id;`;

  const [rows] = await connection.execute<RowDataPacket[]>(query);
  const lectures = normalizeLecture(rows);

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
  const [lecture] = rows as RawLecture[];
  return lecture;
}

export async function updateLectureById(id:string, { talkerId, title, watchedAt }:UpdateLecture) {
  const query = 'UPDATE lecture SET talker_id = ?, title = ?, watched_at = ? WHERE id = ?';
  await connection.execute(query, [talkerId, title, watchedAt, id]);
}
