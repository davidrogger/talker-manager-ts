import { RowDataPacket } from 'mysql2';

export type ILogin = {
  email: string,
  password: string,
};

export type RawUser = {
  id: string,
  firstName: string,
  lastName: string,
} & ILogin;

export type IUserPublic = Omit<RawUser, 'password'>;

export type RawTalker = {
  id: string,
  name: string,
};

export type ILecture = {
  id: string,
  talker: RawTalker,
  title: string,
  watchedAt: string,
};

export type RowLectures = {
  talkerId: string,
  talkerName: string,
} & Omit<ILecture, 'talker'> & RowDataPacket;

export type CreateLecture = {
  talkerId: string,
} & Omit<ILecture, 'id' | 'talker'>;

export type UpdateLecture = CreateLecture;

export type IUserDriverResponse = RawUser & RowDataPacket;
export type ITalkerDriverResponse = RawTalker & RowDataPacket;
