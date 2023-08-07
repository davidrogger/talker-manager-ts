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
  id: string,
  name: string,
  age: number,
} & RowDataPacket;

export type ILecture = {
  id: string,
  talkerName: string,
  title: string,
  watchedAt: string,
};

export type ILectureDriverResponse = RowDataPacket & ILecture;
