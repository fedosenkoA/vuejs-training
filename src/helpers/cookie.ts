export function setCookie(
  name: string,
  value: string,
  expiresAt: number
): void {
  const expires = new Date(expiresAt);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

export function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
}

export function delCookie(name: string): void {
  document.cookie = `${name}=; expires=0; path=/`;
}
