import Unauthorized from '../errors/Unauthorized';
import * as userModel from '../models/user.model';
import { ILogin } from '../types/types';

export async function checkUserCredentials(user:ILogin) {
  const userFound = await userModel.findUserByEmail(user.email);
  if (userFound) return userFound;
  throw new Unauthorized();
}
