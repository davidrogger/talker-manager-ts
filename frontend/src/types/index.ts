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
