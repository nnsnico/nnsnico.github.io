import { KeycapSize } from './types';

export function convertNumberFromUnit(keycapSize: KeycapSize): number {
  switch (keycapSize) {
    case '1U':
      return 1;
    case '1.25U':
      return 1.25;
    case '1.5U':
      return 1.5;
    case '1.75U':
      return 1.75;
    case '2U':
      return 2;
    case '2.25U':
      return 2.25;
    case '3U':
      return 3;
    case '3.5U':
      return 3.5;
    case '5U':
      return 5;
    case '6U':
      return 6;
    case '6.25U':
      return 6.25;
    case '6.5U':
      return 6.5;
    case 'ISOEnter_TOP':
      return 1.5;
    case 'ISOEnter_BOTTOM':
      return 1.25;
  }
}
