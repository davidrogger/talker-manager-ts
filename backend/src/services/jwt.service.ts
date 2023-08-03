import jwt from 'jsonwebtoken';
import 'dotenv/config';

import Unauthorized from '@src/errors/Unauthorized';
import { IUserPublic } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'secret2';

async function tokenGenerator(payload: IUserPublic) {
  if (JWT_SECRET) return jwt.sign(payload, JWT_SECRET);
  throw new Error('Missing Secretkey in the enviroment');
}

function verifyToken(token:string) {
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch (error) {
    throw new Unauthorized('Invalid Token');
  }
}

export default {
  tokenGenerator,
  verifyToken,
};
