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
