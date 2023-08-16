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

export type ILecture = {
  id: string,
  talkerName: string,
  title: string,
  watchedAt: string,
}

export type ITalker = {
  id: string,
  name: string,
}

/** Defined standard to render by **Api Status:** PENDING, RESOLVED or REJECTED */
export enum ApiStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}
