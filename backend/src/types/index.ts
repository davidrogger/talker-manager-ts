import { RowDataPacket } from 'mysql2';

export type ILogin = {
  email: string,
  password: string,
};

export type IUser = {
  id: string,
  firstName: string,
  lastName: string,
} & ILogin;

export type IUserRows = IUser & RowDataPacket;

export type IUserPublic = Omit<IUser, 'password'>;

export type ITalker = {
  id: string,
  name: string,
};

export type ITalkerResponse = ITalker & RowDataPacket;

export type CreateLecture = {
  id: string,
  talkerId: string,
  title: string,
  watchedAt: string,
};

export type UpdateLecture = CreateLecture;

export type ILecture = {
  talkerName: string,
} & Omit<CreateLecture, 'talkerId'>;

export type ILectureDriverResponse = RowDataPacket & ILecture;
