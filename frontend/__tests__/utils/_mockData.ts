import { ITalker } from '@/types';

export const mockUserDataResponse = {
  data: {
    user: {
      firstName: 'Jonas',
      lastName: 'Doe',
      email: 'jonasdoe@testes.com',
    },
  },
};

export const mockLectures = [
  {
    id: '1b9babeb-f5b0-4d4c-9bd9-27918d2430d4',
    talker: {
      id: 'talker-id',
      name: 'Davíd Roggér',
    },
    title: 'Practicing Frontend',
    watchedAt: '08/08/2023',
  },
  {
    id: '1dad1076-5b1c-4194-b480-18b8808b471b',
    talker: {
      id: 'talker-id',
      name: 'Davíd Roggér',
    },
    title: 'Practicing Backend',
    watchedAt: '08/08/2023',
  },
  {
    id: '262cd336-50ea-4a9e-83b5-a3c829e140f5',
    talker: {
      id: 'talker-id',
      name: 'Davíd Roggér',
    },
    title: 'Practicing FullStack',
    watchedAt: '08/08/2023',
  },
  {
    id: '7db8a73f-e461-4bb7-bc04-fe1deae5f3ca',
    talker: {
      id: 'talker-id',
      name: 'Davíd Roggér',
    },
    title: 'Practicing Jest',
    watchedAt: '08/08/2023',
  },
  {
    id: '807165e3-3ead-4263-be3e-b5c0f066aad6',
    talker: {
      id: 'talker-id',
      name: 'Davíd Roggér',
    },
    title: 'Practicing Express',
    watchedAt: '08/08/2023',
  },
  {
    id: '89534693-52d2-4d68-936b-fb64e758c866',
    talker: {
      id: 'talker-id',
      name: 'Davíd Roggér',
    },
    title: 'Practicing Typescript',
    watchedAt: '08/08/2023',
  },
  {
    id: '8fb64a73-971c-44f9-9e84-08c9fa258978',
    talker: {
      id: 'talker-id',
      name: 'Davíd Roggér',
    },
    title: 'Practicing Nextjs',
    watchedAt: '08/08/2023',
  },
  {
    id: 'be2d8790-d7be-464f-992e-26dc29025d85',
    talker: {
      id: 'talker-id',
      name: 'Davíd Roggér',
    },
    title: 'Practicing Docker',
    watchedAt: '08/08/2023',
  },
];

export const mockGetTalkersResponse = [
  {
    id: '27f18acd-373b-49f6-929b-dbef219af9fd',
    name: 'Jonas Doe',
  },
  {
    id: 'e26c1604-20bb-4ea2-a26f-fe97e5a40c3f',
    name: 'Davíd Roggér',
  },
  {
    id: '120ba98b-cf2b-4bf7-96bc-a3e2db788e9a',
    name: 'Gale',
  },
];

export async function fakeTalkerUpdate(endpoint:string, payload:unknown) {
  const [, id] = endpoint.split('/');
  const talkerIndex = mockGetTalkersResponse.findIndex((talker) => talker.id === id);
  mockGetTalkersResponse.splice(talkerIndex, 1, payload as ITalker);
}

const [,, galeTalker] = mockGetTalkersResponse;

export const expectedLectureUpdateRequest = {
  talkerId: galeTalker.id,
  title: 'New title test',
  watchedAt: '10/10/2023',
};
