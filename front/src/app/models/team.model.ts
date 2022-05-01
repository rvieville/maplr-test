import { Player } from './player.mdoel';

export interface Team {
  id: number;
  coach: string;
  year: number;
  players: Array<Player>;
}
