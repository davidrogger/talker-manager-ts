import { IUser, IUserPublic } from '../types/types';
import * as userModel from '../models/user.model';

export async function createUser(user:IUser): Promise<IUserPublic> {
  const id = await userModel.createUser(user);
  const { firstName, lastName, email } = user;
  return {
    id, firstName, lastName, email,
  };
}

export async function findUserByEmail(email:string) {
  return userModel.findUserByEmail(email);
}
