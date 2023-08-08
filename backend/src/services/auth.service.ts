import type { ILogin, IUserPublic } from '@types';

import Unauthorized from '@errors/Unauthorized';

import * as userModel from '@models/user.model';

import * as encryptService from '@services/encrypt.service';

export async function checkUserCredentials(user:ILogin):Promise<IUserPublic> {
  const userFound = await userModel.findUserByEmail(user.email);
  if (userFound
    && await encryptService.verifyPassword(user.password, userFound.password)
  ) {
    const {
      id, email, firstName, lastName,
    } = userFound;
    return {
      id, email, firstName, lastName,
    };
  }

  throw new Unauthorized();
}
