import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { IUserPublic } from '@types';

import Unauthorized from '@errors/Unauthorized';

const JWT_SECRET = process.env.JWT_SECRET || 'secret2';

export async function tokenGenerator(payload: IUserPublic) {
  if (JWT_SECRET) return jwt.sign(payload, JWT_SECRET);
  throw new Error('Missing Secretkey in the enviroment');
}

export function verifyToken(token:string) {
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch (error) {
    throw new Unauthorized('Invalid Token');
  }
}
