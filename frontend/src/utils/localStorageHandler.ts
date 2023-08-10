const LOCAL_TOKEN_KEY = 'talker-token';

export function getStoredToken() {
  return localStorage.getItem(LOCAL_TOKEN_KEY);
}

export function storeToken(token:string) {
  localStorage.setItem(LOCAL_TOKEN_KEY, token);
}
