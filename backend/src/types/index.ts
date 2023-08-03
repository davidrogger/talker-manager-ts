import { RowDataPacket } from 'mysql2';

export type ILogin = {
  email: string,
  password: string,
};

export type IUser = {
  id: string,
  firstName: string,
  lastName: string,
} & ILogin & RowDataPacket;

export type IUserPublic = Omit<IUser, 'password'>;

export type ITalker = {
  name: string,
  age: number,
  id: string,
  talk: {
    watchedAt: string,
    rate: number,
  }
};
