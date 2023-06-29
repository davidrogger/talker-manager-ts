import { IUser } from '../types/types';
import connection from './connection.model';

export async function findUserByEmail(email:string): Promise<IUser | undefined> {
  const [[userFound]] = await connection.execute<IUser[]>(
    'SELECT * FROM user WHERE email = ?',
    [email],
  );

  return userFound;
}
