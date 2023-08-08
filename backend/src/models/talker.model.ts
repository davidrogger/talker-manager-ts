import type { ITalker } from '@types';

import connection from '@models/connection.model';

export async function getAllTalkers() {
  const [talkers] = await connection.execute('SELECT * FROM talker');
  return talkers;
}

export async function createTalker({ id, name, age }:ITalker):Promise<void> {
  await connection.execute('INSERT INTO talker(id, name, age) VALUES(?, ?, ?)', [id, name, age]);
}
