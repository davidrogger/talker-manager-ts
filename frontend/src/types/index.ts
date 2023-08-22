export type LoginInput = {
  email: string,
  password: string,
}

export type LoginReponse = {
  error?: {
    message: string;
  };
  token?: string;
}

export type LoggedUser = {
  firstName: string;
  lastName: string;
  email: string;
}

export enum LectureFields {
  id = 'id',
  talker = 'talker',
  title = 'title',
  watchedAt = 'watchedAt'
}

export type ITalker = {
  id: string,
  name: string,
}

export type ILecture = {
  id: string,
  talker: ITalker,
  title: string,
  watchedAt: string,
}

export type ILectureUpdate = {
  talkerId: string,
} & Omit<ILecture, 'talker' | 'id'>

/** Defined standard to render by **Api Status:** PENDING, RESOLVED or REJECTED */
export enum ApiStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}
