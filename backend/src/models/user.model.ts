import { User } from '../types/types';
import connection from './connection.model';

export async function findUserByEmail(email:string) {
  const [response] = await connection.execute(
    'SELECT * FROM user WHERE email = ?',
    [email],
  );

  const [userFound] = response as User[];

  return userFound;
}
