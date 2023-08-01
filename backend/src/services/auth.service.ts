import Unauthorized from '../errors/Unauthorized';
import * as userModel from '../models/user.model';
import { ILogin, IUser, IUserPublic } from '../types';
import * as encryptService from './encrypt.service';

function normalize(user: IUser): IUserPublic {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  };
}

export async function checkUserCredentials(user:ILogin) {
  const userFound = await userModel.findUserByEmail(user.email);
  if (userFound
    && await encryptService.verifyPassword(user.password, userFound.password)
  ) return normalize(userFound);

  throw new Unauthorized();
}
