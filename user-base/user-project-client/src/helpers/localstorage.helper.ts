export function getTokenFromLocalStorage(): string {
  const tokenInfo = localStorage.getItem("token");
  return tokenInfo ? JSON.parse(tokenInfo) : "";
}

export function setTokenToLocalStorage(key: string, token: string): void {
  localStorage.setItem(key, JSON.stringify(token));
}

export function removeTokenFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
