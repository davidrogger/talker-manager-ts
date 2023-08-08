import type { ResultSetHeader } from 'mysql2';
import type { IUser } from '@types';

import connection from './connection.model';

export async function findUserByEmail(email:string): Promise<IUser | undefined> {
  const [[userFound]] = await connection.execute<IUser[]>(
    'SELECT * FROM user WHERE email = ?',
    [email],
  );

  return userFound;
}

export async function createUser({
  id, firstName, lastName, email, password,
}:IUser) {
  await connection.execute<ResultSetHeader>(
    'INSERT INTO user(id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)',
    [id, firstName, lastName, email, password],
  );
}
