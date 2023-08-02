import { LoginReponse, LoginInput, LoggedUser } from '@/types';
import axios from 'axios';

type AxiosErrorResponse = {
  response: {
    data: {
      message: string,
    }
  }
}

const URL = process.env.API_URL || 'http://localhost:3001';

export const api = axios.create({ baseURL: URL });

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
  if (!token) return null;
  try {
    const { data: { user } } = await api.get('/me', { headers: { Authorization: token } });
    return user;
  } catch (error) {
    localStorage.clear();
    return null;
  }
}
