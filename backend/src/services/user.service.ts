import { IUser, IUserPublic } from '@types';

import * as userModel from '@models/user.model';

export async function createUser({
  id, email, firstName, lastName, password,
}:IUser): Promise<IUserPublic> {
  await userModel.createUser({
    id, email, firstName, lastName, password,
  });
  return {
    id, firstName, lastName, email,
  };
}

export async function findUserByEmail(email:string) {
  return userModel.findUserByEmail(email);
}
