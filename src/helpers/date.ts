export function getHumanReadableDate(date: Date): string {
  const today = new Date();

  if (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  ) {
    return 'Today';
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (yesterday.toDateString() === date.toDateString()) {
    return 'Yesterday';
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (tomorrow.toDateString() === date.toDateString()) {
    return 'Tomorrow';
  }

  return date.toLocaleDateString();
}

export function getLocalNow(): Date {
  const date = new Date();
  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60 * 1000);
}

export function getTimeAMPM(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours12}:${minutesString}${ampm}`;
}

export function getIsoDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getTimeWithoutSecond(date: Date): string {
  return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
}

export function getWeekDayByNumber(number: number): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[number];
}
