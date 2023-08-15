import type { ITalker, ITalkerResponse } from '@types';

import connection from '@models/connection.model';

export async function getAllTalkers() {
  const [talkers] = await connection.execute<ITalkerResponse[]>('SELECT * FROM talker');
  return talkers;
}

export async function createTalker({ id, name }:ITalker):Promise<void> {
  await connection.execute('INSERT INTO talker(id, name) VALUES(?, ?)', [id, name]);
}

export async function findTalkerById(id:string):Promise<ITalker> {
  const query = 'SELECT * FROM talker WHERE id = ?';
  const [rows] = await connection.execute<ITalkerResponse[]>(query, [id]);
  const [talkerFound] = rows as ITalker[];
  return talkerFound;
}

export async function updateTalker({ id, name }:ITalker):Promise<void> {
  const query = 'UPDATE talker SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);
}
