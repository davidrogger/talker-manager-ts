import connection from './connection.model';

export async function getAllTalkers() {
  const [talkers] = await connection.execute('SELECT * FROM talker');
  return talkers;
}
