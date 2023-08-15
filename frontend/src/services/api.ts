import {
  LoginReponse, LoginInput, LoggedUser, ILecture, ITalker,
} from '@/types';
import { getStoredToken } from '@/utils/localStorageHandler';
import axios from 'axios';

type AxiosErrorResponse = {
  response: {
    data: {
      message: string,
    }
  }
}

type getAllLecturesResponse = {
  lectures?:ILecture[],
  error?:unknown,
}

type getAllTalkersResponse = {
  talkers?:ITalker[],
  error?:unknown,
}

const URL = process.env.API_URL || 'http://localhost:3001';

export const api = axios.create({ baseURL: URL });

export async function delay(time = 700) {
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
  return time;
}

export async function loginAuth(user:LoginInput):Promise<LoginReponse> {
  try {
    const { data: { token } } = await api.post('/login', user);
    return { token };
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;

    if (axiosError.response) {
      const { data: { message } } = axiosError.response;
      return { error: { message } } as LoginReponse;
    }

    return { error } as LoginReponse;
  }
}

export async function getUserData(token:string | null):Promise<LoggedUser | null> {
  if (!token) throw new Error();
  const { data: { user } } = await api.get('/me', { headers: { Authorization: token } });
  return user;
}

export async function getAllLectures(time:number = 700):Promise<getAllLecturesResponse> {
  await delay(time);
  try {
    const { data: { lectures } } = await api.get('/lecture');
    return { lectures };
  } catch (error) {
    return { error };
  }
}

export async function getAllTalkers(
  token:string,
  time:number = 700,
):Promise<getAllTalkersResponse> {
  await delay(time);
  try {
    const { data: { talkers } } = await api
      .get('/talker', { headers: { Authorization: token } });
    return { talkers };
  } catch (error) {
    return { error };
  }
}

export async function updateTalker({ id, name }:ITalker):Promise<void> {
  try {
    const token = getStoredToken();
    await api
      .put(`/talker/${id}`, { name }, { headers: { Authorization: token } });
  } catch (error) {
    console.error(error);
  }
}

export async function addNewTalkerByName(name:string) {
  try {
    const token = getStoredToken();
    const talker = await api.post('/talker', { name }, { headers: { Authorization: token } });
    return { talker };
  } catch (error) {
    return { error };
  }
}

export async function deleteTalkerById(id:string) {
  try {
    const token = getStoredToken();
    await api.delete(`/talker/${id}`, { headers: { Authorization: token } });
  } catch (error) {
    console.error(error);
  }
}
