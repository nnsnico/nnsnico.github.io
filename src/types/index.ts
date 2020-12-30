export const keycapSize = [
  '1U',
  '1.25U',
  '1.5U',
  '1.75U',
  '2U',
  '2.25U',
  '2.75U',
  '5U',
  '6U',
  '6.25U',
  '6.5U',
  'ISOEnter',
] as const;

export type KeycapSize = typeof keycapSize[number];
