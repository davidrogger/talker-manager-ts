import { ResultSetHeader } from 'mysql2';
import { IUser } from '../types/types';
import connection from './connection.model';

export async function findUserByEmail(email:string): Promise<IUser | undefined> {
  const [[userFound]] = await connection.execute<IUser[]>(
    'SELECT * FROM user WHERE email = ?',
    [email],
  );

  return userFound;
}

export async function createUser({
  firstName, lastName, email, password,
}:IUser) {
  const [{ insertId }] = await connection.execute<ResultSetHeader>(
    'INSERT INTO user(first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
    [firstName, lastName, email, password],
  );
  return insertId;
}
