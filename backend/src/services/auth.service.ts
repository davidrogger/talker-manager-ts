import Unauthorized from '../errors/Unauthorized';
import * as userModel from '../models/user.model';
import { Login } from '../types/types';

export async function checkUserCredentials(user:Login) {
  const userFound = await userModel.findUserByEmail(user.email);
  if (userFound) return userFound;
  throw new Unauthorized();
}
