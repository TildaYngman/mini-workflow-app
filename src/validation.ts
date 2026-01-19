export const TITLE_MIN = 3;
export const TITLE_MAX = 60;

export const TEXT_MIN = 10;
export const TEXT_MAX = 280;

export function validateTitle(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length < TITLE_MIN)
    return `Title is too short (min ${TITLE_MIN} characters).`;
  if (trimmed.length > TITLE_MAX)
    return `Title is too long (max ${TITLE_MAX} characters).`;
  return null;
}

export function validateText(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length < TEXT_MIN)
    return `Text is too short (min ${TEXT_MIN} characters).`;
  if (trimmed.length > TEXT_MAX)
    return `Text is too long (max ${TEXT_MAX} characters).`;
  return null;
}
