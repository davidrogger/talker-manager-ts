import type { RawTalker, ITalkerDriverResponse } from '@types';

import connection from '@models/connection.model';

export async function getAllTalkers() {
  const [talkers] = await connection.execute<ITalkerDriverResponse[]>('SELECT * FROM talker');
  return talkers;
}

export async function createTalker({ id, name }:RawTalker):Promise<void> {
  await connection.execute('INSERT INTO talker(id, name) VALUES(?, ?)', [id, name]);
}

export async function findTalkerById(id:string):Promise<RawTalker> {
  const query = 'SELECT * FROM talker WHERE id = ?';
  const [rows] = await connection.execute<ITalkerDriverResponse[]>(query, [id]);
  const [talkerFound] = rows as RawTalker[];
  return talkerFound;
}

export async function updateTalker({ id, name }:RawTalker):Promise<void> {
  const query = 'UPDATE talker SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);
}

export async function deleteTalkerById(id:string) {
  const query = 'DELETE FROM talker WHERE id = ?';
  await connection.execute(query, [id]);
}
