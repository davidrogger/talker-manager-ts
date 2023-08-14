import type { ITalker } from '@types';

import connection from '@models/connection.model';
import { RowDataPacket } from 'mysql2';

export async function getAllTalkers() {
  const [talkers] = await connection.execute('SELECT * FROM talker');
  return talkers;
}

export async function createTalker({ id, name, age }:ITalker):Promise<void> {
  await connection.execute('INSERT INTO talker(id, name, age) VALUES(?, ?, ?)', [id, name, age]);
}

export async function findTalkerById(id:string):Promise<ITalker> {
  const query = 'SELECT * FROM talker WHERE id = ?';
  const [rows] = await connection.execute<RowDataPacket[]>(query, [id]);
  const [talkerFound] = rows as ITalker[];
  return talkerFound;
}
