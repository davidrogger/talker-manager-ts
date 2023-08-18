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

export type RawLecture = {
  id: string,
  talkerId: string,
  title: string,
  watchedAt: string,
};

export type CreateLecture = Omit<RawLecture, 'id'>;

export type UpdateLecture = CreateLecture;

export type ILecture = {
  talkerName: string,
} & Omit<CreateLecture, 'talkerId'>;

export type ILectureDriverResponse = RowDataPacket & ILecture;
export type IUserDriverResponse = RawUser & RowDataPacket;
export type ITalkerDriverResponse = RawTalker & RowDataPacket;
