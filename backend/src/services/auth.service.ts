import Unauthorized from '../errors/Unauthorized';
import * as userModel from '../models/user.model';
import { ILogin, IUser } from '../types/types';
import * as encryptService from './encrypt.service';

function normalize(user: IUser): IUser {
  return {
    ...user,
    firstName: user.first_name,
    lastName: user.last_name,
  };
}

export async function checkUserCredentials(user:ILogin) {
  const userFound = await userModel.findUserByEmail(user.email);
  if (userFound
    && await encryptService.verifyPassword(user.password, userFound.password)
  ) return normalize(userFound);

  throw new Unauthorized();
}
