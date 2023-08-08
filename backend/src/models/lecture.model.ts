import { ILecture } from '@src/types';
import { RowDataPacket } from 'mysql2';
import connection from './connection.model';

function normalizeLecture(rows: RowDataPacket[]):ILecture[] {
  const lectures: ILecture[] = rows.map(({
    id, talkerName, title, watchedAt,
  }) => ({
    id,
    talkerName,
    title,
    watchedAt,
  }));

  return lectures;
}

export async function getAllLectures() {
  const query = `
    SELECT lecture.id, talker.name as talkerName, lecture.title, lecture.watchedAt
    FROM lecture
    INNER JOIN talker
    ON talker.id = lecture.talker_id;`;

  const [rows] = await connection.execute<RowDataPacket[]>(query);
  const lectures = normalizeLecture(rows);

  return lectures;
}

export async function createLecture({
  id, talkerName, title, watchedAt,
}:ILecture): Promise<void> {
  const query = 'INSERT INTO lecture(id, talker_name, title, watchedAt) VALUES (?, ?, ?, ?)';
  await connection.execute(query, [id, talkerName, title, watchedAt]);
}
