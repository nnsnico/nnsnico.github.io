import { KeyFrame } from '../types';
import getPcb from './util/pcbParser';

export const PCBName = {
  MacJis: 'Apple Magic Keyboard (JIS)',
} as const;

export type PCBId = keyof typeof PCBName;
export type PCBName = typeof PCBName[keyof typeof PCBName];

interface PCBConfig {
  keyframes: KeyFrame[];
  pcbName: PCBName;
  pixelWidth: number;
  pixelHeight: number;
  rowTotalUnitSize: number;
}

async function macJis(): Promise<PCBConfig> {
  return {
    keyframes: await getPcb('apple_keyboard_jis.csv'),
    pcbName: PCBName.MacJis,
    pixelWidth: 1000,
    pixelHeight: 1000,
    rowTotalUnitSize: 14.5,
  };
}

export default async function getPCB(id: PCBId): Promise<PCBConfig> {
  switch (id) {
    case 'MacJis':
      return macJis();
    default:
      return Promise.reject('Unexpected error: not found pcb id');
  }
}
