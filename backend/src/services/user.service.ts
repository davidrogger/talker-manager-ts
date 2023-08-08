import { v4 as uuid } from 'uuid';

import { IUser, IUserPublic } from '@types';

import * as userModel from '@models/user.model';

export async function createUser(user:IUser): Promise<IUserPublic> {
  const id = uuid();
  await userModel.createUser({ ...user, id });
  const { firstName, lastName, email } = user;
  return {
    id, firstName, lastName, email,
  };
}

export async function findUserByEmail(email:string) {
  return userModel.findUserByEmail(email);
}
