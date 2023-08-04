import { ITalker, IUser } from '../../src/types';

const tester = {
  id: 'generated-id',
  firstName: 'Jonas',
  lastName: 'Doe',
  email: 'jonasdoe@email.com',
  password: 'validpassword',
};

export const loginInput = { email: tester.firstName, password: tester.password };

export const mockedUser = {
  ...tester,
} as IUser;

export const mockPublicUserData = {
  id: tester.id,
  firstName: tester.firstName,
  lastName: tester.lastName,
  email: tester.email,
};

export const mockTalkers = [
  {
    id: '53aed9b7-85cb-4887-a28e-1931132492a9',
    name: 'Henrique Albuquerque',
    age: 62,
  },
  {
    id: '7b4485da-5e62-4423-8a03-392bd35181f4',
    name: 'Heloísa Albuquerque',
    age: 67,
  },
  {
    id: 'a4c44fae-248c-4433-8172-6b4bce04f73e',
    name: 'Ricardo Xavier Filho',
    age: 33,
  },
  {
    id: '7c0eda20-1ef1-4133-b7d7-73ecb4289bab',
    name: 'Marcos Costa',
    age: 24,
  },
] as ITalker[];

export const badTokensTest = [
  {
    token: '',
    expectMessage: 'Missing Token',
  },
  {
    token: 'invalid-token',
    expectMessage: 'Invalid Token',
  },
];

export const talkerPostTest = {
  name: 'Jonas',
  age: 33,
};
