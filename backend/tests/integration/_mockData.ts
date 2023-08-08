import type {
  ILectureDriverResponse, ITalker, IUser,
} from '../../src/types';

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

export const badTalkersPostTest = [
  {
    field: 'name',
    bodyTest: {
      age: 24,
    },
  },
  {
    field: 'age',
    bodyTest: {
      name: 'Marcos Costa',
    },
  },
];

export const badTalkersPostFormatTest = [
  {
    expectedMessage: 'Age need to be a number',
    bodyTest: {
      name: 'Jonas Doe',
      age: 'not-a-number',
    },
  },
  {
    expectedMessage: 'Insert a valid age',
    bodyTest: {
      name: 'Jonas Doe',
      age: -10,
    },
  },
  {
    expectedMessage: 'Name should has at least 3 characters',
    bodyTest: {
      name: 'Ma',
      age: 33,
    },
  },
];

export const mockLecturesGetResponse = [
  {
    id: 'ca42acdd-f60d-45b6-ba8a-b28c77bb68fc',
    talkerName: 'Jonas Doe',
    title: 'Testing Lecture',
    watchedAt: '07/08/2023',
  },
  {
    id: '53aed9b7-85cb-4887-a28e-1931132492a9',
    talkerName: 'Henrique Albuquerque',
    title: 'Testing Lecture2',
    watchedAt: '07/08/2023',
  },
  {
    id: '7b4485da-5e62-4423-8a03-392bd35181f4',
    talkerName: 'Heloísa Albuquerque',
    title: 'Testing Lecture3',
    watchedAt: '07/08/2023',
  },
  {
    id: 'a4c44fae-248c-4433-8172-6b4bce04f73e',
    talkerName: 'Ricardo Xavier Filho',
    title: 'Testing Lecture4',
    watchedAt: '07/08/2023',
  },
] as ILectureDriverResponse[];

export const missingLectureFieldsPost = [
  {
    missingField: 'talkerName',
    invalidBody: {
      title: 'Missing talkerName field',
      watchedAt: '08/08/2023',
    },
  },
  {
    missingField: 'title',
    invalidBody: {
      talkerName: 'Jonas Doe',
      watchedAt: '08/08/2023',
    },
  },
  {
    missingField: 'watchedAt',
    invalidBody: {
      talkerName: 'Jonas Doe',
      title: 'Missing watchedAt field',
    },
  },
];

export const validLecturePost = {
  talkerName: 'Jonas Doe',
  title: 'Missing talkerName field',
  watchedAt: '08/08/2023',
};

export const invalidLectureFieldsPost = [
  {
    expectedMsg: 'talkerName need at least 3 characters',
    invalidBody: {
      talkerName: 'Jo',
      title: 'Missing talkerName field',
      watchedAt: '08/08/2023',
    },
  },
  {
    expectedMsg: 'title need at least 5 characters',
    invalidBody: {
      talkerName: 'Jonas Doe',
      title: 'Miss',
      watchedAt: '08/08/2023',
    },
  },
  {
    expectedMsg: 'watchedAt need a valid format, dd/mm/yyyy',
    invalidBody: {
      talkerName: 'Jonas Doe',
      title: 'Invalid watchedAt field',
      watchedAt: '08-08-2023',
    },
  },
  {
    expectedMsg: 'watchedAt need a valid format, dd/mm/yyyy',
    invalidBody: {
      talkerName: 'Jonas Doe',
      title: 'Invalid watchedAt field',
      watchedAt: '08082023',
    },
  },
  {
    expectedMsg: 'watchedAt need a valid format, dd/mm/yyyy',
    invalidBody: {
      talkerName: 'Jonas Doe',
      title: 'Invalid watchedAt field',
      watchedAt: '08 de agosto de 2023',
    },
  },
  {
    expectedMsg: 'watchedAt need a valid format, dd/mm/yyyy',
    invalidBody: {
      talkerName: 'Jonas Doe',
      title: 'Invalid watchedAt field',
      watchedAt: '01/30/2023',
    },
  },
];
