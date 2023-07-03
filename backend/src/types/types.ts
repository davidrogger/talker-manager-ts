import { RowDataPacket } from 'mysql2';

export type ILogin = {
  email: string,
  password: string,
};

export type IUser = {
  id: number,
  firstName: string,
  lastName: string,
} & ILogin & RowDataPacket;

export type IUserPublic = Omit<IUser, 'password'>;
