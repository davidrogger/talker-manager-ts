import { IUser } from '../../src/types';

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
  firstName: tester.firstName,
  lastName: tester.lastName,
  email: tester.email,
};
