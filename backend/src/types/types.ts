export type Login = {
  email: string,
  password: string,
};

export type User = {
  id: number,
  name: string,
} & Login;
