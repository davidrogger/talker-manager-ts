import { LoginReponse, LoginInput, IToken } from '@/types';
import axios from 'axios';

const URL = process.env.API_URL || 'http://localhost:3001';

export const api = axios.create({ baseURL: URL });

// eslint-disable-next-line no-undef
export async function loginAuth(user:LoginInput):Promise<LoginReponse> {
  try {
    const { data: { token } } = await api.post('/users', user);
    return { token };
  } catch (error) {
    return { error } as LoginReponse;
  }
}
