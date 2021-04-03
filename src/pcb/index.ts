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
  width: number;
  height: number;
  keycapTotalWidth: number;
}

async function macJis(): Promise<PCBConfig> {
  return {
    keyframes: await getPcb('apple_keyboard_jis.csv'),
    pcbName: PCBName.MacJis,
    width: 1000,
    height: 1000,
    keycapTotalWidth: 14.5,
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
