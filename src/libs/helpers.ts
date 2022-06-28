export function createSlug(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .join('-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
