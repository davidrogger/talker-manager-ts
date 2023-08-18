import type { ResultSetHeader } from 'mysql2';
import type { RawUser, IUserDriverResponse } from '@types';

import connection from '@models/connection.model';

export async function findUserByEmail(email:string): Promise<RawUser | undefined> {
  const selectedFields = 'id, first_name AS firstName, last_name AS lastName, email, password';
  const query = `SELECT ${selectedFields} FROM user WHERE email = ?`;

  const [[userFound]] = await connection.execute<IUserDriverResponse[]>(
    query,
    [email],
  );

  return userFound;
}

export async function createUser({
  id, firstName, lastName, email, password,
}:RawUser):Promise<void> {
  const query = 'INSERT INTO user(id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)';
  await connection.execute<ResultSetHeader>(
    query,
    [id, firstName, lastName, email, password],
  );
}
