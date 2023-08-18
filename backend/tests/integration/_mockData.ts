import type {
  ILectureDriverResponse, RawTalker, RawUser, IUserDriverResponse,
} from '@types';
import { RowDataPacket } from 'mysql2';

const tester:RawUser = {
  id: 'generated-id',
  firstName: 'Jonas',
  lastName: 'Doe',
  email: 'jonasdoe@email.com',
  password: 'validpassword',
};

export const loginInput = { email: tester.firstName, password: tester.password };

export const mockedUser = {
  ...tester,
} as IUserDriverResponse;

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
  },
  {
    id: '7b4485da-5e62-4423-8a03-392bd35181f4',
    name: 'Heloísa Albuquerque',
  },
  {
    id: 'a4c44fae-248c-4433-8172-6b4bce04f73e',
    name: 'Ricardo Xavier Filho',
  },
  {
    id: '7c0eda20-1ef1-4133-b7d7-73ecb4289bab',
    name: 'Marcos Costa',
  },
] as RawTalker[];

export const [mockTalker] = mockTalkers as RowDataPacket[];

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
};

export const badTalkersPostFormatTest = [
  {
    expectedMessage: 'Name should has at least 3 characters',
    bodyTest: {
      name: 'Ma',
    },
  },
  {
    expectedMessage: 'Name should has at least 3 characters',
    bodyTest: {
      name: 'M',
    },
  },
];

export const mockAllLecturesResponse = [
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

export const [mockOneLectureResponse] = mockAllLecturesResponse;

export const missingLectureFieldsPost = [
  {
    missingField: 'talkerId',
    invalidBody: {
      title: 'Missing talkerId field',
      watchedAt: '08/08/2023',
    },
  },
  {
    missingField: 'title',
    invalidBody: {
      talkerId: 'valid-id',
      watchedAt: '08/08/2023',
    },
  },
  {
    missingField: 'watchedAt',
    invalidBody: {
      talkerId: 'valid-id',
      title: 'Missing watchedAt field',
    },
  },
];

export const validLecturePost = {
  talkerId: 'valid-id',
  title: 'Posting the Lecture successfully test',
  watchedAt: '08/08/2023',
};

export const invalidLectureFieldsPost = [
  {
    expectedMsg: 'title need at least 5 characters',
    invalidBody: {
      talkerId: 'valid-id',
      title: 'Miss',
      watchedAt: '08/08/2023',
    },
  },
  {
    expectedMsg: 'watchedAt need a valid format, dd/mm/yyyy',
    invalidBody: {
      talkerId: 'valid-id',
      title: 'Invalid watchedAt field',
      watchedAt: '08-08-2023',
    },
  },
  {
    expectedMsg: 'watchedAt need a valid format, dd/mm/yyyy',
    invalidBody: {
      talkerId: 'valid-id',
      title: 'Invalid watchedAt field',
      watchedAt: '08082023',
    },
  },
  {
    expectedMsg: 'watchedAt need a valid format, dd/mm/yyyy',
    invalidBody: {
      talkerId: 'valid-id',
      title: 'Invalid watchedAt field',
      watchedAt: '08 de agosto de 2023',
    },
  },
  {
    expectedMsg: 'watchedAt need a valid format, dd/mm/yyyy',
    invalidBody: {
      talkerId: 'valid-id',
      title: 'Invalid watchedAt field',
      watchedAt: '01/30/2023',
    },
  },
];
