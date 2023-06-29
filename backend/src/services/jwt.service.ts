import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { ILogin } from '../types/types';

const { JWT_SECRET } = process.env;

async function tokenGenerator(payload: ILogin) {
  if (JWT_SECRET) return jwt.sign(payload, JWT_SECRET);
  throw new Error('Missing Secretkey in the enviroment');
}

export default {
  tokenGenerator,
};
